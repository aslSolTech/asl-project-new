# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Install OpenSSL and libc dependencies required by Prisma & Sharp native binaries on Alpine
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --ignore-scripts

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client & compile TypeScript to JS
RUN ./node_modules/.bin/prisma generate
RUN npm run build

# Prune devDependencies to keep final production image minimal
RUN npm prune --omit=dev

# Stage 3: Runner (Production Output Image)
FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=5000

# Copy application assets and production node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated

# Create storage and upload directories with proper non-root node user ownership
RUN mkdir -p storage && chown -R node:node /app

USER node

EXPOSE 5000

CMD ["node", "dist/index.js"]
