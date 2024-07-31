FROM node:20-bookworm-slim AS dependencies
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
RUN npm ci --force

FROM dependencies AS migration
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get upgrade openssl -y
WORKDIR /app
CMD ["npm", "run", "migrate"]

FROM dependencies AS build
WORKDIR /app
RUN npm run build

FROM node:20-bookworm-slim as production
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get upgrade openssl -y
WORKDIR /app
COPY --from=build /app/.next/standalone/ ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 80

CMD ["sh", "-c", "PORT=80 node server.js"]
