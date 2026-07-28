# ====================================================
# STAGE 1: Build Stage (Dependencies & Compilation)
# ====================================================
FROM node:24-alpine AS builder

WORKDIR /app

# Prisma engine ke liye Alpine OS par openssl zaroori hai
RUN apk add --no-cache openssl

# Package files aur Prisma schema copy karein
COPY package*.json ./
COPY prisma ./prisma/

# Security Hardening: Lifecycle scripts disable karke exact dependencies install karein
RUN npm ci --ignore-scripts

# Project ka source code copy karein
COPY . .

# Local installed Prisma CLI using exact version (no unverified external downloads)
RUN ./node_modules/.bin/prisma generate

# TypeScript project ko JavaScript (dist folder) me compile karein
RUN npm run build

# Extra devDependencies ko hata kar sirf production modules rakhein
RUN npm prune --omit=dev


# ====================================================
# STAGE 2: Production Runner (Final lightweight image)
# ====================================================
FROM node:24-alpine AS runner

WORKDIR /app

# Prisma runtime ke liye openssl install karein
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=5000

# Builder stage se sirf zaruri files copy karein
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated

# Storage/Uploads folder banayein aur permissions non-root node user ko dein
RUN mkdir -p storage uploads && chown -R node:node /app

# Security ke liye default non-root node user ka use karein
USER node

# Port 5000 expose karein
EXPOSE 5000

# Application start karne ke liye command
CMD ["node", "dist/index.js"]
