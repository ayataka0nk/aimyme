#!/bin/sh
echo "Running database migrations..."
npm run migrate

if [ $? -ne 0 ]; then
    echo "Migration failed!"
    exit 1
fi
export PORT=80

echo "Starting the server..."
exec node server.js
