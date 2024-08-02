# aimyme

## prisma

https://www.prisma.io/docs/getting-started/quickstart

- 最初だけ
  - `npx prisma init --datasource-provider postgresql`
  - .env更新

- 2回目以降
  - 手動で schema.prisma を書き換え
  - `npx prisma generate`で schema.prisma をもとに型定義を生成する
  - `npx prisma migrate dev --create-only`でマイグレーションファイルを生成する
  - `npx prisma migrate deploy`でマイグレーションを実行する

ローカルでの実験
```

docker run -d -p 80:80 -e DATABASE_URL="postgresql://postgres:password@host.docker.internal:5432/aimyme?schema=public" b3f8e7e0dfe9fdf5cbb4af5995add987c9f7ca9effebacf938dcec29a144507c
```
