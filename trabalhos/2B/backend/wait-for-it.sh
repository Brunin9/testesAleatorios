#!/usr/bin/env bash
# Aguarda o host:porta estar pronto

hostport="$1"
shift
host=$(echo "$hostport" | cut -d: -f1)
port=$(echo "$hostport" | cut -d: -f2)

echo "⏳ Aguardando $host:$port..."

while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "✅ $host:$port está pronto. Executando comando: $@"
exec "$@"
