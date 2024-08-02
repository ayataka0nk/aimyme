FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY . .
RUN npm ci --force
RUN npx prisma generate
RUN npm run build

FROM node:20-bookworm-slim as production
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get upgrade openssl -y
RUN npm install -g prisma
WORKDIR /app
COPY --from=build /app/.next/standalone/ ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/docker-entrypoint.sh ./docker-entrypoint.sh
EXPOSE 80

CMD ["/bin/sh", "./docker-entrypoint.sh"]
