# Stage 1: Base
FROM node:22.16.0 AS base

# Stage 2: Dependencies
COPY package*.json ./
RUN npm install

# Stage 3: Production
FROM node:22.16.0 AS production
WORKDIR /src
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]
