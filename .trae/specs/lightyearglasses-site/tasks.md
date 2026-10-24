# Lightyear Glasses 品牌展示网站 - Implementation Plan

## Task 1: 项目初始化（Next.js 15 + Tailwind + Payload CMS）
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 使用 `create-next-app@latest` 初始化 Next.js 15 项目，App Router、TypeScript、Tailwind CSS、ESLint
  - 安装 Payload CMS v2.26+ 及其依赖（payload，@payloadcms/richtext-slate，payload-seed 等）
  - 配置 tailwind.config.js 自定义主题色（参考 Ere Perez：主色 #212326，背景 #FFFFFF，标题色深灰，衬线字体 Frank Ruhl Libre）
  - 配置 next.config.js（images domains、Payload CMS path）
  - 创建 Payload CMS 基础配置：collections（Products、Pages、Media、Blog Posts、Users）
  - 配置项目目录结构：app/、components/、collections/、lib/、public/
- **Acceptance Criteria Addressed**: AC-3, AC-4
- **Test Requirements**:
  - `rule` TR-1.1: `npm run dev` 启动成功，localhost:3000 访问返回 200
  - `rule` TR-1.2: localhost:3000/admin 能看到 Payload CMS 登录页
  - `rubric` TR-1.3: 项目结构规范度；scale 1-5；anchors 1=混乱 3=基本规范 5=按 Next.js + Payload 最佳实践组织；threshold >= 4；evidence 目录树截图
- **Notes**: Payload v2 推荐，v3 还在 beta。Payload v2 与 Next.js 15 兼容性需确认，不行降级 Next.js 14。

## Task 2: Payload CMS Collections 设计
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Products Collection: title（文本）、slug（唯一）、description（富文本）、images（多图）、featured（布尔）、rating（数字）、reviews（数字）、selling_points（数组）、category（单选：Makeup/Skincare/Gifts）、subcategory（单选：Face/Eyes/Lips/Cleanser/Moisturiser/Serum 等）、price（数字，展示用）、status（草稿/已发布）
  - Pages Collection（首页各 section + 品牌故事 + FAQ 等）: title、slug、sections（数组类型，包含 hero/featured_media/rich_text/image_text/media_grid/testimonials/blog_preview/newsletter 等不同 block 类型）
  - Media Collection: Payload 默认的（图片上传、自动 thumbnail）
  - Blog Posts Collection: title、slug、cover_image、content（富文本）、published_at、author、category、tags
  - Settings Collection（单例）: site_name、logo、navigation（JSON）、footer_links（JSON）、social_links（JSON）
  - 创建 seed 数据（8 个产品、3 个博客、首页默认内容）
- **Acceptance Criteria Addressed**: AC-3, AC-7
- **Test Requirements**:
  - `rule` TR-2.1: 后台 Products Collection 能新增产品并保存，slug 唯一校验生效
  - `rule` TR-2.2: Media Collection 能上传图片，自动生成 thumbnail
  - `rubric` TR-2.3: Collection 字段设计完整度；scale 1-5；anchors 1=字段缺失 3=基本可用 5=覆盖所有需求字段+合理分组；threshold >= 4；evidence 后台 Collection 截图

## Task 3: 全局布局与导航组件
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 创建根布局 `app/layout.tsx`：字体加载（Frank Ruhl Libre + Roboto，next/font/google）、全局 CSS reset、footer
  - 创建 Header 组件：固定透明导航栏、Logo、主菜单（Makeup/Skincare/Gifts & Sets/Our Story）、Mega Menu 下拉、右侧工具栏（FAQ、Contact、Wishlist、Cart 图标占位）、移动端汉堡菜单
  - 创建 Footer 组件：Shop/Support/Social 三列链接 + 社交媒体图标（Pinterest/Instagram/TikTok/YouTube）+ 版权信息 + 支付图标占位
  - 导航和页脚链接从 CMS Settings 读取
- **Acceptance Criteria Addressed**: AC-2, AC-4
- **Test Requirements**:
  - `rule` TR-3.1: 顶部导航在首页、产品列表页、产品详情页等所有页面都显示正确
  - `rule` TR-3.2: Mega Menu 鼠标悬停展开子分类，移动端汉堡菜单点击展开
  - `rubric` TR-3.3: 导航视觉还原度；scale 1-5；anchors 1=完全不同 3=基本相似 5=高度还原 Ere Perez 风格；threshold >= 4；evidence 导航对比截图

## Task 4: 首页构建
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **Description**:
  - Hero 区：全宽大图 + 标题 + 副标题 + CTA 按钮（参考 Ere Perez "new! your forever eye wardrobe" section）
  - 品牌介绍区（Beauty Beyond Clean）：标题 + 品牌理念文案 + 装饰性图片（左右/上下布局）
  - As Seen In 区：媒体 Logo 墙（至少 8 个 logo，灰底白底切换，可横滑）
  - Best Sellers 轮播区：横滑产品卡片（图片 + 名称 + 星级评分 + 评论数 + 核心卖点 bullet + "Learn More" 链接），产品从 CMS 读取 featured 标记
  - 新品/专题区：全宽背景图 + 专题标题 + CTA 按钮
  - 用户评价区：3-4 个评价卡片轮播（用户名 + 星级 + 评价内容）
  - Journal 预告区：3 个最新博客文章卡片（封面图 + 标题 + 日期）
  - Newsletter 订阅表单：邮箱输入 + 订阅按钮（暂时前端提交成功提示，不接真实邮件服务）
  - 所有 section 内容从 CMS Pages 首页配置读取
  - 添加 IntersectionObserver 滚动渐显动画
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-4
- **Test Requirements**:
  - `rule` TR-4.1: 首页所有 section 从顶部到底部完整渲染，无空白
  - `rule` TR-4.2: Best Sellers 轮播能左右滑动，鼠标悬停暂停自动播放
  - `rule` TR-4.3: 所有 "Learn More" 链接正确跳转到对应产品详情页
  - `rubric` TR-4.4: 首页整体视觉还原度；scale 1-5；anchors 1=布局完全不同 3=布局相似细节差 5=极简风格+留白+字体+配色+动效高度还原；threshold >= 4；evidence 首页截图 vs Ere Perez 首页

## Task 5: 产品列表页与产品详情页
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **Description**:
  - 产品列表页 `/collections/[slug]`：产品网格（3-4 列）、分类筛选（Makeup/Skincare/Gifts tab）、每个卡片显示图片+名称+价格占位+悬停效果（图片切换）
  - 产品详情页 `/products/[slug]`：
    - 左侧：产品大图轮播（多张图切换）
    - 右侧：产品名称、星级评分 + 评论数、价格、核心卖点 bullet（支持多列）、色号/款式选择（如果有）、成分/规格说明、"Learn More" 按钮、"+bag" 占位按钮（灰色，显示"View full details"或 disabled）
  - 产品数据从 Payload CMS Products Collection 读取
- **Acceptance Criteria Addressed**: AC-2, AC-4, AC-7
- **Test Requirements**:
  - `rule` TR-5.1: `/collections/all` 和 `/collections/makeup` 都能正确渲染产品网格
  - `rule` TR-5.2: `/products/任意slug` 返回 200，显示完整产品信息
  - `rule` TR-5.3: 产品卡片悬停触发图片切换效果
  - `rubric` TR-5.4: 产品详情页视觉还原度；scale 1-5；anchors 1=信息混乱 3=基本完整 5=布局/图片切换/字体/留白与 Ere Perez 高度一致；threshold >= 4；evidence 详情页对比截图

## Task 6: 品牌故事、媒体报道、Blog 等二级页面
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2, Task 3
- **Description**:
  - `/pages/about` 品牌故事页：Founder 介绍 + 品牌理念 + Sustainability 承诺，富文本 + 图片
  - `/pages/press` 媒体报道页：As Seen In Logo 墙 + 媒体文章列表（标题 + 媒体名 + 日期 + 链接）
  - `/pages/retailers` 零售点页：列表展示合作渠道（名称 + 地址 + 网站）
  - `/blog` Blog 列表页：卡片网格，按日期倒序
  - `/blog/[slug]` Blog 详情页：封面图 + 标题 + 日期 + 作者 + 正文富文本
  - `/pages/faq` FAQ 页：手风琴折叠式问答列表
  - `/pages/contact` Contact 页：联系表单（姓名+邮箱+内容，前端提交提示，不接真实后端）+ 联系信息
  - `/pages/shipping-returns` /pages/terms 静态页面：富文本
  - 所有页面从 CMS Pages / Blog Collection 读取
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `rule` TR-6.1: 上述所有二级页面 URL 返回 200
  - `rule` TR-6.2: Blog 列表页按日期倒序展示
  - `rubric` TR-6.3: 品牌故事/FAQ 页面视觉与首页风格一致性；scale 1-5；anchors 1=风格突变 3=基本一致 5=字体/配色/留白完全统一；threshold >= 4；evidence 多页面截图

## Task 7: 轮播组件与交互动效
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - 封装轮播组件 `Carousel.tsx`：支持触摸滑动、箭头按钮、自动播放（可配置间隔）、分页指示器、循环播放
  - 用于 As Seen In Logo 墙、Best Sellers、用户评价、产品详情页图片切换
  - 产品卡片悬停效果：第二张图淡入
  - IntersectionObserver 滚动渐显动画（fade-up + fade-in，不同 section 延迟错开）
  - 移动端适配：汉堡菜单、触摸轮播、单列布局
  - 字体加载优化：next/font 预加载关键字体
- **Acceptance Criteria Addressed**: AC-4, AC-5
- **Test Requirements**:
  - `rule` TR-7.1: Best Sellers 轮播在桌面和移动端都能正常滑动
  - `rule` TR-7.2: 产品详情页图片切换无闪烁
  - `rubric` TR-7.3: 交互动效流畅度；scale 1-5；anchors 1=卡顿/突兀 3=基本流畅 5=丝滑，与 Ere Perez 动效风格一致；threshold >= 4；evidence 录屏或动画截图对比

## Task 8: SEO 与图片优化
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1, Task 4, Task 5, Task 6
- **Description**:
  - 每个页面配置 Next.js metadata：title、description、OG image、keywords
  - 产品页面 metadata 动态从 CMS 读取
  - 全站使用 next/image 组件：自动 WebP/AVIF、懒加载、占位图
  - 生成 sitemap.xml（Next.js 内置 generateSitemap）
  - 配置 robots.txt
  - 配置 canonical URL
  - 图片尺寸规范（产品图统一 800x1000 或正方形）
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `rule` TR-8.1: /sitemap.xml 可访问并返回有效 XML
  - `rule` TR-8.2: 图片全部使用 next/image，HTML 检查无裸 <img> 标签
  - `rubric` TR-8.3: Lighthouse SEO 分数；scale 1-5（对应 0-100 分）；anchors 1=<50 3=70-89 5=95-100；threshold >= 4（≥90）；evidence Lighthouse 报告

## Task 9: 一键部署脚本
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1-8
- **Description**:
  - 创建 `deploy.sh` 一键部署脚本，完成以下步骤：
    1. apt update && apt upgrade -y
    2. 安装 Node.js 20（NodeSource）、Nginx、PM2、Git、build-essential
    3. 创建 /var/www 目录
    4. git clone 项目代码（从 GitHub 仓库）
    5. npm ci --production=false（Payload CMS 需要 dev 依赖构建）
    6. npm run build（Next.js build + Payload CMS admin UI build）
    7. pm2 start ecosystem.config.js
    8. pm2 save + pm2 startup
    9. 配置 Nginx：server block 反向代理到 localhost:3000，启用 gzip，静态资源缓存
    10. 系统资源校验（内存 < 1.5GB）
  - 创建 `ecosystem.config.js` PM2 配置
  - 创建 `nginx.conf` 模板
  - 创建 `post-deploy.sh`（更新代码后快速重启）
  - 脚本参数支持 DOMAIN（默认 mo.lightyearglasses.com）
- **Acceptance Criteria Addressed**: AC-8, AC-9
- **Test Requirements**:
  - `rule` TR-9.1: 在全新 Ubuntu 22.04 机器上执行脚本，成功启动并 curl localhost:3000 返回 200
  - `rule` TR-9.2: Nginx 配置生效，访问域名返回网站内容
  - `rule` TR-9.3: `pm2 status` 显示 Next.js 进程 online，restart count = 0
  - `rubric` TR-9.4: 部署脚本健壮度；scale 1-5；anchors 1=一步错就全停 3=基本能跑 5=有错误处理/重试/日志/幂等性；threshold >= 4；evidence 脚本执行日志 + ec2 测试

## Task 10: GitHub 仓库与代码推送
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1-8
- **Description**:
  - 初始化 git 仓库，创建 .gitignore（node_modules、.next、.env、storage/uploads）
  - 配置 GitHub 远程仓库（用户创建或我代创建）
  - 推送全部代码到 GitHub
  - 创建 initial commit，tag v0.1.0
  - 如果 Payload CMS admin UI 无法在服务器上 build，准备好解决方案（本地 build 后推 .next）
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `rule` TR-10.1: GitHub 仓库可访问，包含所有项目文件
  - `rule` TR-10.2: 服务器上 `git clone` 能成功拉取代码
  - `rubric` TR-10.3: 仓库结构规范度（有 README 部署说明、commit message 清晰）；scale 1-5；anchors 1=只有代码 3=基本说明 5=完整部署文档；threshold >= 3；evidence README 截图

## Task 11: HTTPS 证书配置
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 9（部署完成）
- **Description**:
  - 安装 certbot 和 python3-certbot-nginx
  - 为 mo.lightyearglasses.com 申请 Let's Encrypt 免费证书
  - Nginx 自动配置 HTTPS 重定向（HTTP → HTTPS）
  - 自动续期（certbot 已配置 cron）
  - 验证：https://mo.lightyearglasses.com 返回 200
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `rule` TR-11.1: curl -I https://mo.lightyearglasses.com 返回 200，HTTP/1.1 或 2
  - `rule` TR-11.2: http://mo.lightyearglasses.com 自动 301 重定向到 https://
- **Notes**: 这一步需要 DNS 已指向服务器 IP，否则证书签发失败。

## Task 12: 图片和文案占位数据填充
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2, Task 4, Task 5
- **Description**:
  - 用 Unsplash 免费图片（beauty、skincare、cosmetics 分类）填充所有产品图和 section 图
  - 用 AI 生成的产品棚拍图作为备选（Seedream 插件能力）
  - 产品文案参考 Ere Perez 但改写（卖点、成分描述、品牌故事）
  - Seed 脚本：首次 npm run dev 时自动创建默认产品/页面数据（payload-seed）
  - 所有图片文件名规范化（product-01.jpg, product-02.jpg 等）
  - 确保图片版权合法（Unsplash 允许免费商用，AI 生成图原创）
- **Acceptance Criteria Addressed**: AC-4, AC-7
- **Test Requirements**:
  - `rule` TR-12.1: 首页和产品页所有图片能正常加载（无 broken image）
  - `rule` TR-12.2: npm run seed 能成功执行并填充默认数据
  - `rubric` TR-12.3: 图片与品牌调性匹配度；scale 1-5；anchors 1=不相关 3=基本合适 5=与 Ere Perez 视觉调性一致（极简、天然、明亮）；threshold >= 4；evidence 全站点图片截图

## Task 13: Lighthouse 性能优化 & 验证
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 8, Task 9（部署到服务器后）
- **Description**:
  - 使用 Chrome Lighthouse CLI 跑本地和线上分数
  - 优化方向：字体 subset、图片格式降级 fallback、关键 CSS 内联、第三方脚本延迟加载
  - 验证首屏 FCP < 1.5s，LCP < 2.5s，CLS < 0.1
  - 最终 Lighthouse 三项目标分数 ≥ 90
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `rule` TR-13.1: 线上 https://mo.lightyearglasses.com Lighthouse Performance ≥ 90
  - `rule` TR-13.2: Lighthouse Accessibility ≥ 90
  - `rule` TR-13.3: Lighthouse SEO ≥ 90
  - `rubric` TR-13.4: 性能指标达标率；scale 1-5（对应 P90 指标）；anchors 1=LCP>3s 3=LCP 2.5-3s 5=LCP<2.5s + CLS<0.1；threshold >= 4；evidence Lighthouse 报告 + Web Vitals

## Task 14: 独立 Review
- **Status**: `pending`
- **Priority**: high
- **Depends On**: 所有其他 Task completed
- **Description**:
  - 启动独立 Review agent（全新上下文）
  - Review agent 检查所有 AC 是否满足
  - 访问线上网站验证功能完整
  - 跑 Lighthouse 报告
  - 输出 review.md
- **Acceptance Criteria Addressed**: 全部 AC
- **Test Requirements**: （Review Phase 产出 review.md）
- **Notes**: 需要部署完成后才能 Review，且 Review agent 需要能访问线上域名。如果沙盒网络限制，Review 通过代码检查 + 本地 build + Lighthouse CLI 替代。
