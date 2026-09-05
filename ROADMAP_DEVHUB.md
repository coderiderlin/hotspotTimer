# 🛠️ Qdev / DevHub 个人产品矩阵与自建发布中心构想

本文档记录了基于 **Qdev** 腾讯云服务器打造个人专属轻量产品矩阵、独立域名发布中心及自建统计分析后台的完整技术蓝图与架构设计。

---

## 一、项目现状与演进路径

### 1. 当前线上资产
- **云服务器**：腾讯云 Linux（代号 `Qdev`，公网 IP `123.207.207.2`，已配置免密 SSH 别名 `ssh Qdev`）。
- **统一门户入口**：`http://123.207.207.2/`（QDEV HUB 街机游戏 + 实用工具矩阵）。
- **已部署工具**：
  - 🍲 **火锅涮肉计时器 (Web 版)**：`http://123.207.207.2/hotpot/`
  - 📱 **火锅涮肉计时器 (微信小程序版)**：`/Users/cod/projects/hotspotTimer/miniprogram`
  - 🎮 **ArcadeX 街机小游戏矩阵**：2048、贪吃蛇、俄罗斯方块等。
- **标准化部署 Skill**：`~/.claude/skills/qdev-deploy`，支持秒级自动打包、静态同步、Nginx 路由更新与主页收录。

---

## 二、独立域名设想与选型分析 (`devhub.ai` 等)

### 1. 域名价值
- **微信传播利好**：纯 IP 地址在微信内打开容易被拦截或提示“未备案/风险提醒”；独立域名配置 SSL（HTTPS）后，分享更体面、无拦截，甚至能生成美观的微信外链卡片。
- **统一入口**：以后任何写出的新工具（如：`devhub.ai/hotpot/`、`devhub.ai/tools/calc`、`devhub.ai/games/`），用户只需记住一个主域名。

### 2. 域名现状与备选方案
- `devhub.ai`：于 2019 年已被注册。且 `.ai` 后缀官方续费成本较高（通常需 2 年起付，约 120~160 美元/两年）。
- **推荐高性价比备选**：
  1. `qdevhub.com`（目前查询**未被注册**，契合 Qdev 命名，`.com` 极度亲民且稳定，首年约 60~70 元人民币）；
  2. `qdev.fun` / `devhub.top` / `devhub.me` / `codhub.dev`（个性化 Geek 后缀）；
  3. `qdev.tools`（纯工具箱属性）。

### 3. 国内解析与备案注意点
- **服务器在国内（腾讯云）**：
  - 如果域名走 80/443 端口直连腾讯云国内服务器，按工信部合规要求需要**个人 ICP 备案**（微信小程序使用独立域名 API 也需要备案）；
  - 备案流程：个人身份证通过腾讯云小程序免费在线提交，约 3~7 个工作日下发备案号。
- **免备案平替（Cloudflare 代理）**：
  - 若短期不想备案，可通过国外轻量云或 Cloudflare Tunnel 穿透代理到服务器，但国内访问速度稍慢。综合来看在腾讯云做一次个人 ICP 备案体验最佳。

---

## 三、自研极轻量统计后台方案（替代 GA / 百度统计）

### 1. 为什么不用第三方统计？
- **百度统计 / Google Analytics**：代码包庞大、会插入大量 Cookie，在微信内经常被拦截，且移动端报表繁重。
- **个人轻量需求**：只想看 **日活（UV）、总访问（PV）、各工具使用排行、来源（微信/直接访问/群聊分享）**。

### 2. 极简技术实现架构（仅需 ~100 行代码）

#### 方案 A：Nginx 访问日志无侵入分析（最轻量，完全无前端埋点）
- **原理**：前端什么都不用加，利用现有的 Nginx Access Log。
- **实现**：
  - 编写一个 Python / Go 小服务部署在 Qdev；
  - 定时读取 `/var/log/nginx/access.log`，正则提取 IP、访问路径（如 `/hotpot/`）、User-Agent（识别是否为微信内打开 `MicroMessenger`）、Referer；
  - 存入轻量 SQLite 数据库，对外输出一个极简只读 API `/api/stats`。

#### 方案 B：微型采集埋点 API（实时性好，统计更精准）
- **前端 SDK (小于 1KB)**：
  ```javascript
  // 放在每个工具 index.html 的公共脚本中
  (function() {
    const data = {
      path: location.pathname,
      ua: navigator.userAgent,
      ref: document.referrer,
      t: Date.now()
    };
    navigator.sendBeacon('https://yourdomain/api/track', JSON.stringify(data));
  })();
  ```
- **后端服务**：
  - Node.js (Koa/Express) 或 Python (FastAPI)；
  - 仅开辟一个 `/api/track` (POST) 接口，直接写入本地 SQLite。
- **展示看板**：
  - 挂载在主页 `/stats` 或 QDEV HUB 底部，卡片化展示各工具的热门程度与趋势图表。

---

## 四、自建发布中心工作流 (CI/CD) 演进

未来多工具矩阵开发完成后的标准发布工作流：

```text
[本地开发] (React/Vue/原生)
     ↓
[本地构建] (npm run build)
     ↓
[一键发布] (命令行: qdev-deploy <app_name>)
     ↓
[自动同步] (rsync 到 Qdev: /projects/<app_name>/dist)
     ↓
[自动收录] (更新主页 QDEV HUB 导航卡片，追加新工具)
     ↓
[通知提醒] (企业微信机器人自动推送上线通知及带域名链接)
```

---

## 五、待办与跟进建议 (Todo List)
- [ ] 确定主域名（建议挑选一个中意的 `.com` 或 `.tools` 并在腾讯云注册）。
- [ ] 完成个人域名 ICP 备案与 HTTPS 证书配置（Certbot 免费 Let's Encrypt 证书自动化）。
- [ ] 在 Qdev 启动极轻量统计服务，为 QDEV HUB 和各个子工具接入访问统计。
- [ ] 微信小程序版火锅计时器待开发者工具重新扫码后，一键生成真机体验版二维码。
