#!/bin/bash
set -euo pipefail

# 快速更新脚本：拉新代码 + 构建 + 重启 PM2
# 用法：cd /var/www/lightyear-site && bash update.sh

APP_DIR="/var/www/lightyear-site"
cd "$APP_DIR"

echo "=== 更新代码 ==="
git fetch --depth=1 origin main
git reset --hard origin/main

echo "=== 安装依赖 ==="
npm ci --no-audit --no-fund 2>&1 | tail -3

echo "=== 构建 ==="
npm run build 2>&1 | tail -5

echo "=== 重启 PM2 ==="
pm2 restart lightyear-site

echo "=== ✓ 更新完成 ==="
pm2 status lightyear-site
