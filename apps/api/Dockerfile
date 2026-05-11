FROM node:22-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api ./apps/api
COPY packages ./packages
RUN corepack enable && pnpm install --frozen-lockfile=false
RUN pnpm --filter @mirasly/api build
CMD ["pnpm", "--filter", "@mirasly/api", "start"]
