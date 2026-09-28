FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN npm ci

FROM base AS build
COPY apps/api apps/api
RUN npm run build -w @expense/api

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache wget && addgroup -S nodejs && adduser -S nestjs -G nodejs
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
    && npm ci --omit=dev \
    && npm cache clean --force \
    && apk del .build-deps
COPY --from=build --chown=nestjs:nodejs /app/apps/api/dist apps/api/dist
RUN mkdir -p /app/data && chown -R nestjs:nodejs /app/data
USER nestjs
EXPOSE 3001
CMD ["node", "apps/api/dist/main.js"]
