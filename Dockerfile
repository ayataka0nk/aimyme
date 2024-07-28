FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY public ./public
COPY prisma ./prisma
COPY src ./src
COPY next.config.mjs ./
COPY package-lock.json ./
COPY package.json ./
COPY postcss.config.mjs ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.script.json ./

RUN ls -la
RUN npm ci
RUN npm run build

FROM node:20-bookworm-slim
WORKDIR /app
COPY --from=build /app/.next/standalone/ ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
