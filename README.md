# 暨美丽用户端

面向消费者的 Vue 3 + UniApp 用户端，同时支持 H5 和微信小程序，并附带本地开发用 Node.js 业务模块。

## 项目简介

用户端覆盖首页、门店浏览、预约、商城、商品详情、购物车、结算、订单、积分、礼品、分享、会员资料和法律页面等完整消费流程。`server/` 提供本地开发和业务模块接口，正式环境通过 `anqi-beauty-backend` 的统一 API 与 MySQL 服务协作。

## 技术栈

- Vue 3、UniApp、Vite
- 微信小程序和 H5 构建目标
- JavaScript、Sass、Vue I18n
- Node.js、mysql2、QRCode
- MySQL（生产环境）与本地 JSON 开发数据
- npm

## 关联仓库

| 项目 | 说明 | GitHub |
| --- | --- | --- |
| anqi-beauty-backend | 后端服务 | [anqi-beauty-backend](https://github.com/sickelgroupe-create/anqi-beauty-backend) |
| anqi-beauty-admin | 管理后台 | [anqi-beauty-admin](https://github.com/sickelgroupe-create/anqi-beauty-admin) |
| anqi-beauty-app | 用户端 | [anqi-beauty-app](https://github.com/sickelgroupe-create/anqi-beauty-app) |

## 快速启动

安装依赖：

```sh
npm ci
```

启动本地业务模块和 H5：

```sh
npm run server
npm run dev:h5
```

构建发布包：

```sh
npm run build:h5
npm run build:mp-weixin
```

复制 `.env.example` 为 `.env`，配置本地端口、数据库和接口地址。真实密码、微信 AppSecret、内部密钥和生产环境变量只通过部署环境注入；`server/data/` 仅用于本地数据，不会提交。

## 项目结构

- `pages/`：首页、商城、预约、订单、会员和分享等 UniApp 页面。
- `common/`、`components/`、`custom-tab-bar/`：接口、公共逻辑和跨端组件。
- `static/`、`source-assets/`：用户端图片、品牌和展示资源。
- `server/`：Node.js 业务模块、微信登录适配和本地数据存储。
- `tools/`：UniApp 构建与测试辅助脚本。
- `docs/`：API、部署交付和后台使用文档。

## 简历描述示例

负责暨美丽用户端从页面到发布流程的开发，基于 UniApp Vue 3 同时交付 H5 和微信小程序，完成商城、预约、订单、积分与会员等消费场景并接入统一后端服务。
