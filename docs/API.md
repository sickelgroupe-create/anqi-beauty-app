# 业务接口说明

旧扩展接口已停用并返回404，后台不提供相关菜单。

正式用户接口：`https://anqi.okam.top/api`；若依管理接口：`https://anqiht.okam.top/prod-api/anqi/:collection`。正式管理认证使用若依 `/prod-api/login` 与角色权限，公网不开放旧 `/api/admin/*`。以下旧管理路径仅供本地演示或内部业务服务参考。

登录接口：`POST /auth/wechat`（微信小程序 `wx.login` code，由服务端换取 openid；当前只支持微信一键登录）；后台 `POST /anqi/orders/:id`（线下收款、取消、物流说明）、`POST /anqi/users/:id`（会员资格与停用状态）。预约核销完成会同步将服务订单标记完成。

根地址 `http://127.0.0.1:3000/api`。JSON 请求和响应；失败返回 HTTP 400/401/403/404/503 与 `{ "error": "说明" }`。用户和管理员令牌放在 `Authorization: Bearer <token>`，管理员令牌不能用于用户数据接口。

| 方法 | 路径 | 功能 |
|---|---|---|
| GET | /health | 服务状态/演示模式 |
| GET | /bootstrap | 页面配置、上架商品、门店 |
| POST | /auth/wechat | 微信小程序一键登录，body `{code,invite?}` |
| POST | /auth/refresh | 刷新当前微信会话 |
| POST | /auth/logout | 退出并使当前会话失效 |
| GET/PUT | /me | 当前用户；更新name、gender |
| GET/POST | /addresses | 地址列表/创建 |
| PUT/DELETE | /addresses/:id | 修改/删除本人地址 |
| GET/POST | /orders | 本人订单/创建订单 |
| GET | /orders/:id | 本人订单详情 |
| POST | /orders/:id/cancel | 取消待付款订单并回补库存 |
| POST | /orders/:id/pay | 测试环境模拟支付；body outcome=success/failure/cancel，必须带 Idempotency-Key |
| GET/POST | /appointments | 本人预约/新增预约 |
| GET | /activities、/alliances | 已上架的活动和联盟 |
| POST | /claims | 受邀会员领取商品；productIds数组 |
| GET | /shares、/earnings | 本人邀请/收益列表（预留） |
| POST | /admin/login | 管理登录；password |
| GET | /admin/dashboard | 经营统计 |
| GET/PUT | /admin/config | 首页海报、协议、会员规则 |
| POST | /admin/upload | data为PNG/JPEG/WebP Data URL，最大5MB |
| GET/POST | /admin/:collection | 内容列表/新增 |
| PUT/DELETE | /admin/:collection/:id | 内容更新/删除 |
| PUT | /admin/orders/:id | 将已付订单核销completed |
| PUT | /admin/appointments/:id | booked/completed/cancelled |
| PUT | /admin/users/:id | invited布尔值，维护领取资格 |

内容 collection：products、stores、activities、alliances。只读管理列表还包括 orders、appointments、users、claims、paymentAudits（支付审计）。

创建订单示例：

```json
{"productId":"p1","quantity":1,"spec":"single","storeId":"store-1","message":"预约前请电话联系"}
```

spec取single/course；服务器读取实时商品价格，忽略客户端金额。实物订单还需本人addressId。订单保存下单时商品和地址快照，库存不足会拒绝。待付订单满2小时在下一次API请求中自动关闭并回补库存。

创建地址：name、phone（11位手机号）、city、detail、isDefault。默认地址对当前用户唯一。

创建预约：orderId、date（YYYY-MM-DD）、time（09/10/11/14/15/16/17/18:00）；当前一个已付款服务订单只允许一个有效预约。

安全与部署边界：演示只监听回环地址；后台密码限速；资源按userId校验所有权；库存和订单状态在单进程中同步更新并原子替换数据文件。数据库多进程事务、限流全局化和正式支付回调需在生产接入阶段完成。

新增：POST /me/avatar 接收图片Data URL，DELETE /me/avatar恢复默认头像；GET /share-code生成当前会员分享码图片。本地演示二维码与正式微信小程序码分开处理。



