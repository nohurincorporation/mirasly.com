FROM node:22-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/admin ./apps/admin
COPY packages ./packages
RUN corepack enable && pnpm install --frozen-lockfile=false
RUN pnpm --filter @mirasly/admin build
CMD ["pnpm", "--filter", "@mirasly/admin", "start"]
