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
