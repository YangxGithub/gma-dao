# GMA DAO 网站完整部署包

## 📦 文件结构

```
GMA-DAO-KIMI/
├── index.html              # 主页面
├── admin.html              # 管理后台
├── assets/
│   ├── index-CawMnySU.js   # 主JS文件
│   ├── main-v2.js          # 辅助JS
│   ├── admin-B0FJBAdO.js   # 管理后台JS
│   └── index-g6T6Sh4u.css  # 样式文件
└── images/
    ├── hero-bg.jpg         # 首页背景
    ├── article-1.jpg       # 文章图片
    ├── article-2.jpg
    ├── article-3.jpg
    ├── event-city.jpg      # 活动图片
    ├── event-tournament.jpg
    └── event-xspace.jpg
```

## 🌐 访问地址

| 页面 | 地址 |
|------|------|
| 主站 | `/` 或 `/index.html` |
| 管理后台 | `/admin.html` |

## 🔐 管理后台登录

- 用户名：`gmaadmin`
- 密码：`GMA2026!@#`

## 📋 管理后台功能

- ✅ Navigation（导航栏）
- ✅ Hero Section（首页横幅）
- ✅ About Section（关于我们）
- ✅ Business（业务介绍）
- ✅ Games Index（游戏列表）
- ✅ Media Center（媒体中心）
- ✅ Events（活动管理）
- ✅ Open Tasks（任务管理）
- ✅ Portfolio（投资项目）
- ✅ Partners（合作伙伴）
- ✅ Footer（页脚）

## 🚀 部署方法

### 方式一：静态托管（推荐）

1. 解压 zip 文件
2. 上传到 Vercel/Netlify/Cloudflare Pages
3. 访问域名即可

### 方式二：自己的服务器

```bash
# Nginx 配置
server {
    listen 80;
    root /var/www/gma-dao;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 方式三：本地预览

```bash
cd GMA-DAO-KIMI
python3 -m http.server 8080
```

---
**© 2026 GMA DAO**
