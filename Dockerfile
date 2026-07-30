FROM node:24-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci --ignore-scripts

COPY . .

RUN ./node_modules/.bin/prisma generate
RUN npm run build

FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache openssl

ENV PORT=5000

COPY --chown=node:node --from=builder /app/package.json .
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/prisma ./prisma
COPY --chown=node:node --from=builder /app/src/generated ./src/generated

RUN mkdir -p storage && chown -R node:node storage

USER node

EXPOSE 5000

CMD ["node", "dist/index.js"]