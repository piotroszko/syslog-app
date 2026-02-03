FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
# Copy all package.json files
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/eslint-config/package*.json ./packages/eslint-config/
COPY packages/typescript-config/package*.json ./packages/typescript-config/
COPY apps/api/package*.json ./apps/api/

# Copy packages source (needed for workspace linking and building)
COPY packages ./packages

# Install all dependencies
RUN npm ci

# Build the @workspace/api package BEFORE the main app
RUN cd packages/api && npm run build

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY package*.json ./
COPY apps/api ./apps/api

# Build the API
WORKDIR /app/apps/api
RUN npx nest build

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

if [ ! -f /data/syslog.sqlite ] || [ "\$FORCE_SEED" = "true" ]; then
  echo "Seeding database..."
  npx ts-node src/db/seed.ts
fi

echo "Starting API server..."
exec node dist/main.js
EOF

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
