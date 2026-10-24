#!/bin/bash
set -euo pipefail

# ============================================================
# Lightyear Glasses — 一键部署脚本
# ============================================================
# 用法：
#   wget -qO- https://raw.githubusercontent.com/IPFS520/lightyearglasses-site/main/deploy.sh | bash
# 或者：
#   curl -fsSL https://raw.githubusercontent.com/IPFS520/lightyearglasses-site/main/deploy.sh | bash
# ============================================================

REPO_URL="https://github.com/IPFS520/lightyearglasses-site.git"
APP_DIR="/var/www/lightyear-site"
DOMAIN="${1:-mo.lightyearglasses.com}"

echo ""
echo "========================================"
echo "  Lightyear Glasses — 一键部署"
echo "  目标域名: $DOMAIN"
echo "========================================"
echo ""

# ---- 1. 更新系统 ----
echo "[1/9] 更新系统包..."
sudo apt update -qq && sudo apt upgrade -y -qq
echo "  ✓ 系统已更新"

# ---- 2. 安装基础依赖 ----
echo "[2/9] 安装基础依赖..."
sudo apt install -y -qq curl wget git build-essential unzip
echo "  ✓ 基础依赖已安装"

# ---- 3. 安装 Node.js 20 ----
if command -v node &>/dev/null && [[ "$(node -v)" == v2* ]]; then
  echo "[3/9] Node.js $(node -v) 已安装，跳过"
else
  echo "[3/9] 安装 Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y -qq nodejs
  echo "  ✓ Node.js $(node -v) 已安装"
fi

# ---- 4. 安装 Nginx ----
if command -v nginx &>/dev/null; then
  echo "[4/9] Nginx 已安装，跳过"
else
  echo "[4/9] 安装 Nginx..."
  sudo apt install -y -qq nginx
  echo "  ✓ Nginx 已安装"
fi

# ---- 5. 安装 PM2 ----
if command -v pm2 &>/dev/null; then
  echo "[5/9] PM2 已安装，跳过"
else
  echo "[5/9] 安装 PM2..."
  sudo npm install -g pm2
  echo "  ✓ PM2 已安装"
fi

# ---- 6. 拉取代码 ----
echo "[6/9] 拉取代码..."
if [ -d "$APP_DIR/.git" ]; then
  echo "  检测到已有项目，执行 git pull..."
  cd "$APP_DIR"
  git fetch --depth=1 origin main
  git reset --hard origin/main
else
  sudo mkdir -p /var/www
  sudo chown -R "$USER":www-data /var/www
  cd /var/www
  git clone --depth=1 "$REPO_URL" lightyear-site
fi
echo "  ✓ 代码已拉取"

# ---- 7. 安装依赖并构建 ----
echo "[7/9] 安装依赖并构建（可能需要几分钟）..."
cd "$APP_DIR"
npm ci --no-audit --no-fund 2>&1 | tail -3
npm run build 2>&1 | tail -5
echo "  ✓ 构建完成"

# ---- 8. PM2 启动 ----
echo "[8/9] 启动服务..."
cd "$APP_DIR"
# 停掉旧的
pm2 delete lightyear-site 2>/dev/null || true
# 启动新的
pm2 start ecosystem.config.js
pm2 save
# 设置开机自启（需要 sudo）
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u "$USER" --hp "$HOME" 2>/dev/null || true
echo "  ✓ PM2 已启动"

# ---- 9. 配置 Nginx ----
echo "[9/9] 配置 Nginx..."
NGINX_CONF="/etc/nginx/sites-available/lightyear-site"
cat | sudo tee "$NGINX_CONF" > /dev/null << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    access_log /var/log/nginx/lightyear-access.log;
    error_log  /var/log/nginx/lightyear-error.log;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_min_length 256;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }

    location /health {
        access_log off;
        return 200 "ok";
        add_header Content-Type text/plain;
    }
}
EOF

# 启用站点
sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/lightyear-site
# 禁用默认站点（避免冲突）
sudo rm -f /etc/nginx/sites-enabled/default
# 测试配置
sudo nginx -t 2>&1
# 重启
sudo systemctl reload nginx
echo "  ✓ Nginx 已配置"

# ---- 完成 ----
echo ""
echo "========================================"
echo "  🎉 部署完成！"
echo "========================================"
echo ""
echo "  访问地址: http://$DOMAIN"
echo "  本地测试: http://服务器IP"
echo ""
echo "  常用命令:"
echo "    pm2 status              — 查看服务状态"
echo "    pm2 logs lightyear-site — 查看日志"
echo "    pm2 restart lightyear-site — 重启"
echo "    cd /var/www/lightyear-site && bash update.sh — 更新代码"
echo ""
echo "  内存占用:"
free -h | grep Mem
echo ""
echo "  ⚠️  如果域名还没生效，在 DNS 添加 A 记录:"
echo "     主机记录: mo"
echo "     记录值: $(curl -s ifconfig.me 2>/dev/null || echo '你的服务器IP')"
echo ""
