#!/bin/sh
set -e

# Load from .env file if it exists (for local dev)
if [ -f .env ]; then
  echo "Loading environment from .env"
  set -o allexport
  . .env
  set +o allexport
fi

### Load DEPLOY_KEY
if [ -f /run/secrets/deploy_key ]; then
  export DEPLOY_KEY=$(cat /run/secrets/deploy_key)
  echo "Loaded DEPLOY_KEY from /run/secrets"
elif [ -n "$DEPLOY_KEY" ]; then
  echo "Using DEPLOY_KEY from environment"
else
  echo "ERROR: deploy_key not found in /run/secrets or environment"
  exit 1
fi

# Write to temporary file for tools like SSH
echo "$DEPLOY_KEY" > /tmp/deploy_key
chmod 600 /tmp/deploy_key


### Load WEBHOOK_SECRET
if [ -f /run/secrets/WEBHOOK_SECRET ]; then
  export WEBHOOK_SECRET=$(cat /run/secrets/WEBHOOK_SECRET)
  echo "Loaded WEBHOOK_SECRET from /run/secrets"
elif [ -n "$WEBHOOK_SECRET" ]; then
  echo "Using WEBHOOK_SECRET from environment"
else
  echo "ERROR: webhook_secret not found in /run/secrets or environment"
  exit 1
fi

# Optional: write to temp file (if you ever need it in scripts)
echo "$WEBHOOK_SECRET" > /tmp/WEBHOOK_SECRET
chmod 600 /tmp/WEBHOOK_SECRET

# Run the actual command
exec "$@"
