FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/eslint-config/package*.json ./packages/eslint-config/
COPY packages/typescript-config/package*.json ./packages/typescript-config/
COPY apps/api/package*.json ./apps/api/
RUN npm ci --workspace=api --include-workspace-root

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY packages ./packages
COPY apps/api ./apps/api
WORKDIR /app/apps/api
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/package.json ./apps/api/package.json

COPY --from=build /app/apps/api/src ./apps/api/src
COPY --from=build /app/apps/api/tsconfig.json ./apps/api/tsconfig.json

WORKDIR /app/apps/api

RUN mkdir -p /data

ENV NODE_ENV=production
ENV DB_PATH=/data/syslog.sqlite

EXPOSE 3001

COPY <<EOF /app/entrypoint.sh
#!/bin/sh
set -e

# Run seed if DB doesn't exist or FORCE_SEED is set
if [ ! -f /data/syslog.sqlite ] || [ "\$FORCE_SEED" = "true" ]; then
  echo "Seeding database..."
  npx ts-node src/db/seed.ts
fi

echo "Starting API server..."
exec node dist/main.js
EOF

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
