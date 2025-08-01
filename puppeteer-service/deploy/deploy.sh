#!/bin/sh
set -e

echo "[Deploy] Pulling latest code from Git..."

GIT_SSH_COMMAND="ssh -i /tmp/deploy_key -o StrictHostKeyChecking=no" git pull origin main

echo "[Deploy] Restarting app using PM2..."
pm2 reload ecosystem.config.js --only scrapper