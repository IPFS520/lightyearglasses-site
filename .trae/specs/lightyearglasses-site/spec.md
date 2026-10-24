# Lightyear Glasses 品牌展示网站 - Product Requirements Document

## Overview
- **Summary**: 模仿 Ere Perez（https://ereperez.com）美妆品牌官网的极简风格，构建一个面向海外用户的品牌展示型网站。使用 Next.js 15 + Tailwind CSS 3 技术栈，搭配 Payload CMS 轻量后台，部署在腾讯云美东服务器，通过子域名 mo.lightyearglasses.com 对外提供服务。
- **Purpose**: 为 Lightyear Glasses 品牌搭建线上展示门户，替代传统电商平台店铺，以品牌官网形式展示产品、品牌故事和媒体报道，提升品牌专业形象。
- **Target Users**: 海外消费者（主要是欧美地区），关注品牌故事、产品成分和视觉美感的美妆/眼镜类消费者。

## Goals
- 还原 Ere Perez 的极简视觉风格（白底、大量留白、衬线+无衬线字体组合、全宽 section 布局）
- 实现完整的首页和核心二级页面，支持产品卡片、轮播图、品牌故事、媒体背书等展示形式
- 提供可视化后台，支持非技术人员上传图片、编辑文案、增删产品
- 优化海外用户访问性能（美东机房部署 + Next.js SSR + 图片 CDN）
- 完全不用交易功能（无购物车、无支付、无价格体系）

## Non-Goals
- 不实现任何交易功能（购物车、支付、订单管理）
- 不实现多语言/多地区站点（先做英文站）
- 不实现用户系统（注册、登录、收藏夹）
- 不实现真实产品库存管理
- 不抄袭 Ere Perez 的图片和品牌资产（视觉参考但内容原创）

## Background & Context
- **参考站**: Ere Perez (https://ereperez.com) — Shopify 平台搭建的天然美妆品牌官网，极简留白风格
- **服务器**: 腾讯云轻量应用服务器（美东弗吉尼亚机房），2核 2GB 50GB SSD 30Mbps
- **域名**: lightyearglasses.com 主域名已持有，使用子域名 mo.lightyearglasses.com 指向美东服务器
- **运维方式**: 用户通过腾讯云 OrcaTerm WebShell 手动执行部署命令，无法远程 SSH 连接服务器
- **图片资源**: 初期使用 Unsplash 免费图 + AI 生成图作为占位，后续通过后台替换

## Functional Requirements

### 导航与布局
- **FR-1**: 顶部固定导航栏，包含 Logo、主菜单（Makeup/Skincare/Gifts & Sets/Our Story）、右侧工具栏（FAQ、Contact、Login、Wishlist、Cart 占位）
- **FR-2**: 导航菜单项支持 Mega Menu 下拉展开子分类
- **FR-3**: 页脚包含 Shop/Support/Social 三列链接 + 社交媒体图标 + 版权信息

### 首页内容区（按顺序）
- **FR-4**: Hero 区 — 大图/视频背景 + 品牌 slogan + CTA 按钮
- **FR-5**: 品牌介绍区 — 品牌理念文案 + 装饰性图片
- **FR-6**: 媒体背书区 — "As Seen In" 媒体 Logo 墙
- **FR-7**: Best Sellers 产品轮播区 — 横滑产品卡片（图片+名称+星级+卖点+Learn More）
- **FR-8**: 新品/专题区 — 大图背景 + 专题文案 + 产品展示
- **FR-9**: 用户评价区 — 轮播/网格展示用户好评
- **FR-10**: Journal / 博客预告区 — 最新博客文章卡片
- **FR-11**: Newsletter 订阅表单区

### 二级页面
- **FR-12**: 产品列表页 `/collections/[slug]` — 网格展示，支持分类筛选（Makeup / Skincare / Gifts）
- **FR-13**: 产品详情页 `/products/[slug]` — 大图轮播、产品名称、星级评分、卖点列表、成分/规格说明、CTA
- **FR-14**: 品牌故事页 `/pages/about` — Founder & Philosophy、Clean Beauty 理念、Sustainability 承诺
- **FR-15**: 媒体报道页 `/pages/press` — As Seen In Logo 墙 + 媒体详情
- **FR-16**: 零售点页 `/pages/retailers` — 合作渠道列表/地图
- **FR-17**: Blog 列表页 `/blog` + 详情页 `/blog/[slug]`
- **FR-18**: FAQ 页 `/pages/faq`、Contact 页 `/pages/contact`、Shipping & Returns 页

### 后台管理
- **FR-19**: `/admin` 后台登录页（用户名密码）
- **FR-20**: 产品 CRUD — 新增/编辑/删除产品，上传多图，设置卖点文案、分类、星级
- **FR-21**: 页面内容编辑 — 首页各 section、品牌故事、FAQ 等页面的富文本编辑
- **FR-22**: 图片上传 — 支持拖拽上传图片，自动压缩和格式转换

### 交互动效
- **FR-23**: 产品卡片悬停效果（图片切换、阴影加深）
- **FR-24**: 轮播组件（Best Sellers、媒体报道、评价区、Blog），支持触摸滑动和自动播放
- **FR-25**: 滚动渐显动画（IntersectionObserver）
- **FR-26**: 移动端自适应（汉堡菜单、单列布局）

## Non-Functional Requirements

- **NFR-1**: 首屏加载时间 < 2s（美东机房，Next.js SSR，PageSpeed 90+）
- **NFR-2**: Lighthouse 性能、可访问性、SEO 三项均 ≥ 90 分
- **NFR-3**: 全站响应式，适配 360px - 1920px 宽度
- **NFR-4**: 所有图片自动 WebP/AVIF 格式、懒加载、CDN 加速
- **NFR-5**: 支持 SEO — 每个页面可独立设置 title、description、OG 图
- **NFR-6**: 服务器资源占用稳定，2GB 内存下空闲 < 500MB
- **NFR-7**: Nginx 反向代理，PM2 守护 Next.js 进程，进程崩溃自动重启

## Constraints

### Technical
- Node.js 20 LTS（腾讯云 apt 安装）
- Next.js 15 App Router（推荐）或 Next.js 14 Pages Router（更成熟）
- Tailwind CSS 3.4+
- Payload CMS v2（Next.js 生态原生，与 Next.js 同进程，轻量）
- SQLite（Payload CMS 默认数据库，零配置，足够展示站用）
- Nginx 作为反向代理
- PM2 作为 Node.js 进程管理器
- 沙盒网络出口限制，无法直接 SSH 到用户服务器，需要 GitHub 中转方案

### Business
- 服务器资源有限（2核 2GB，不能跑太重的 CMS）
- 首版不做交易，后台不涉及订单/支付
- 图片和文案需原创/合法（不直接抄 Ere Perez 商业素材）

### Dependencies
- 服务器环境：Node.js 20、Nginx、PM2、Git、build-essential（sharp 依赖）
- Payload CMS v2.26+（需要 @payloadcms/richtext-slate 可选）
- 图片 CDN 可选：Cloudinary 免费版 / 本地存储

## Assumptions
- 用户通过腾讯云 OrcaTerm WebShell 执行部署命令，可访问外网下载依赖
- 服务器防火墙已开放 80/443 端口（HTTP/HTTPS），22 端口 SSH 已开
- 域名 mo.lightyearglasses.com 的 DNS 解析已或即将完成（A 记录指向 43.166.128.207）
- 用户能通过 `sudo` 执行系统级命令
- GitHub 仓库将用于代码中转（用户需创建仓库或允许匿名方式）
- 2GB 内存能跑 Next.js + Payload CMS + Nginx + PM2（Payload 较之前端无额外进程，共享内存，实测可行）

## Acceptance Criteria

### AC-1: 服务器可访问性
- **Type**: `rule`
- **Given**: 服务器已部署完成
- **When**: 在浏览器访问 http://mo.lightyearglasses.com
- **Then**: 返回 HTTP 200，页面正常渲染，无空白或报错
- **Pass Condition**: curl 返回 200，浏览器打开可见首页内容
- **Evidence**: 手动访问截图 + curl 输出

### AC-2: 核心页面可访问性
- **Type**: `rule`
- **Given**: 网站已部署
- **When**: 依次访问 /、/collections/all、/products/[slug]、/pages/about、/blog、/pages/faq
- **Then**: 每个页面 HTTP 200，内容完整，导航链接正常跳转
- **Pass Condition**: 上述 URL 全部返回 200，页面渲染完整
- **Evidence**: 逐页访问截图或 curl 输出

### AC-3: 后台管理可访问
- **Type**: `rule`
- **Given**: 网站已部署且已配置管理员账号
- **When**: 访问 /admin 并使用正确账号登录
- **Then**: 能进入 Payload CMS 后台，看到产品、页面、媒体等 Collection
- **Pass Condition**: /admin 返回 200，登录后看到 CMS 界面
- **Evidence**: 后台截图

### AC-4: 视觉还原度
- **Type**: `rubric`
- **Dimension**: 视觉风格与 Ere Perez 参考站的还原度
- **Scale**: 1-5
- **Anchors**: 1 = 布局/配色/字体完全不同；3 = 布局相似但配色字体差异大；5 = 极简风格一致，布局/配色/字体/动效高度还原
- **Pass Threshold**: >= 4
- **Evidence**: 首页截图 vs Ere Perez 首页截图对比

### AC-5: 移动端响应式
- **Type**: `rubric`
- **Dimension**: 移动端（360px 宽）适配完整度
- **Scale**: 1-5
- **Anchors**: 1 = 严重溢出或元素遮挡；3 = 基本可用但有小瑕疵；5 = 汉堡菜单、单列布局、触摸滑动、字体大小全部正确
- **Pass Threshold**: >= 4
- **Evidence**: Chrome DevTools 移动端截图

### AC-6: Lighthouse 分数
- **Type**: `rubric`
- **Dimension**: 性能 / 可访问性 / SEO 综合分数
- **Scale**: 1-5（对应 Lighthouse 分数段）
- **Anchors**: 1 = 任意维度 < 50；3 = 全部 ≥ 70；5 = 全部 ≥ 95
- **Pass Threshold**: >= 4（全部 ≥ 90）
- **Evidence**: Lighthouse 报告截图

### AC-7: 后台上传图片流程
- **Type**: `rule`
- **Given**: 管理员已登录后台
- **When**: 上传一张产品图片并关联到某产品
- **Then**: 图片出现在 Media Collection，产品详情页能看到更新后的图片
- **Pass Condition**: 后台上传成功，前台页面刷新后显示新图片
- **Evidence**: 后台上传截图 + 前台刷新截图

### AC-8: 服务器资源占用
- **Type**: `rule`
- **Given**: Next.js + Nginx + Payload CMS 全部运行中
- **When**: 使用 free -h 查看内存
- **Then**: 总内存占用 < 1.5GB（2GB 机器留 500MB 缓冲）
- **Pass Condition**: 服务器 free -h 输出显示 used < 1.5G
- **Evidence**: 服务器 free -h 命令输出

### AC-9: 一键部署
- **Type**: `rule`
- **Given**: 一台全新的 Ubuntu 22.04 服务器，有 sudo 权限和外网访问
- **When**: 执行 `wget -qO- <deploy-url> | bash`
- **Then**: 脚本全自动完成 Node.js 安装、依赖安装、git clone、pm2 启动、Nginx 配置
- **Pass Condition**: 一条命令完成后访问域名看到网站
- **Evidence**: 部署日志输出 + 访问结果

## Open Questions
- [ ] Payload CMS 图片存储用本地磁盘还是加 Cloudinary？（本地零成本但不占空间，Cloudinary 有 CDN 加速）→ 暂定先本地存储，后续按需加 Cloudinary
- [ ] 首版产品数量？→ 暂定 8-12 个产品，覆盖 Makeup + Skincare 两大类
- [ ] Blog 内容怎么处理？→ 首版用 3 篇占位文章，后台后续自己发
- [ ] HTTPS 证书？→ 部署完后用 Let's Encrypt 自动配置（certbot）
