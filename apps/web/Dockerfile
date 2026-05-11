FROM node:22-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/web ./apps/web
COPY packages ./packages
RUN corepack enable && pnpm install --frozen-lockfile=false
RUN pnpm --filter @mirasly/web build
CMD ["pnpm", "--filter", "@mirasly/web", "start"]
