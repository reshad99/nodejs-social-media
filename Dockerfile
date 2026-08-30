ARG NODE_VERSION=24.20.0

FROM node:${NODE_VERSION}-alpine AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM dependencies AS builder

ENV DATABASE_URL=postgresql://build:build@localhost:5432/build

COPY . .
RUN npm run build

FROM dependencies AS migrator

COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

CMD ["npx", "prisma", "migrate", "deploy"]

FROM node:${NODE_VERSION}-alpine AS production-dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

FROM node:${NODE_VERSION}-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

RUN apk add --no-cache dumb-init \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs nestjs

COPY --from=production-dependencies --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --chown=nestjs:nodejs package.json ./package.json

USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=15s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r => { if (!r.ok) process.exit(1) }).catch(() => process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
