# 网页游戏导航 · Web Games

我的网页游戏**导航页**。这个仓库本身不装游戏，只做一件事：把分散在各个游戏仓库里的网页汇总成一个好看的入口，点一下就能玩。

**在线访问：<https://game.prodhub.me/>** ← 最短，推荐记这个

三个地址打开的是同一个页面：

| 地址 | 说明 |
| --- | --- |
| <https://game.prodhub.me/> | 我配的短地址，301 跳转到规范地址（**后面不要再加路径**，加了会 404） |
| <https://home.prodhub.me/web-games/> | 规范地址，GitHub Pages 实际发布的位置 |
| <https://produce123.github.io/web-games/> | 仓库默认地址，会自动跳转到规范地址 |

> 为什么规范地址是 `home.prodhub.me` 而不是 `produce123.github.io`：账号的用户站绑定了自定义域名 `home.prodhub.me`，GitHub 会把同账号下的项目站也放到该域名下。所以 `https://home.prodhub.me/<仓库名>/` 就是每个游戏仓库开启 Pages 后的地址。

---

## 这是什么

每个游戏都是**独立的仓库、独立部署**（各自开自己的 GitHub Pages），这个仓库只存一个静态导航页：

- 想加一个游戏？在 `assets/js/games.js` 里加一条数据，页面立刻多一张卡片。
- 游戏代码改动、重构甚至换技术栈，都和这个导航页无关，不用回来改这里。
- 某个游戏还没部署网页时，卡片会显示「待部署」并置灰，不会给出死链接。

## 目录结构

```
web-games/
├── index.html              # 导航页（只有一个空容器，卡片由脚本渲染）
├── assets/
│   ├── favicon.png         # 网页图标（128×128 透明底 PNG）
│   ├── css/style.css       # 全部样式：设计令牌 + 卡片列表
│   └── js/
│       ├── games.js        # ★ 导航清单，唯一需要经常改的文件
│       └── main.js         # 渲染卡片、搜索、页脚
├── LICENSE
└── README.md
```

整个站点没有 `package.json`、没有构建步骤、没有外部 CDN 或字体，双击 `index.html` 就能看。

## 添加一个游戏

打开 `assets/js/games.js`，照着加一条：

```js
{
  title: "打砖块",
  desc: "一句话介绍这个游戏。",
  url: "https://home.prodhub.me/brick-breaker/", // 线上地址
  repo: "https://github.com/produce123/brick-breaker", // 可选，会多一个「源码」按钮
  icon: "🧱", // 可选，一个 emoji
  tags: ["街机"], // 可选，搜索时会一起匹配
  action: "开始游戏", // 可选，主按钮文字，默认就是「开始游戏」
  pinned: false, // 可选，写 true 会置顶
}
```

字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 卡片标题 |
| `desc` | 否 | 一句话介绍 |
| `url` | 否 | 线上地址。留空表示网页还没部署，卡片显示「待部署」并置灰 |
| `repo` | 否 | 源码仓库地址，填了会多一个「源码」按钮 |
| `icon` | 否 | 一个 emoji，显示在卡片左侧 |
| `tags` | 否 | 标签数组，搜索时会一起匹配 |
| `action` | 否 | 主按钮文字，默认「开始游戏」。不是游戏就写「访问」 |
| `pinned` | 否 | 写 `true` 会置顶，和它在数组里的位置无关 |

游戏数量达到 4 个时，页面顶部会自动出现搜索框（少于 4 个时自动隐藏，避免占地方）。

### 新游戏仓库怎么开 Pages

在游戏仓库里：**Settings → Pages → Source 选 `Deploy from a branch` → 分支 `main`、目录 `/ (root)` → Save**。

等一两分钟，地址就是 `https://home.prodhub.me/<仓库名>/`。把这个地址填进 `games.js` 的 `url` 即可。

## 改了内容但网页没变？（缓存问题）

这是 GitHub Pages 的缓存策略造成的，不是没推送成功。实测响应头：

| 资源 | `cache-control` | 含义 |
| --- | --- | --- |
| `assets/**`（`games.js`、`main.js`、`style.css`） | `max-age=14400` | 浏览器会**直接用手里的旧副本，4 小时内根本不去问服务器** |
| `index.html` | `max-age=600` | 10 分钟后才会去问服务器 |

因为两者过期时间不同，最容易出现的症状是「**HTML 是新的，但卡片还是旧的**」——
看起来像只更新了一半，其实是浏览器只重新下载了 HTML，`games.js` 还在用本地缓存。

三种解法，按场景选：

1. **立刻看效果**：在页面上按 `Ctrl + Shift + R`（Mac 用 `Cmd + Shift + R`）强制刷新。对你自己的浏览器，这就够了。
2. **让所有访问者都马上看到**（推荐，已内置）：改完 `games.js` 后，把 `index.html` 里**几处** `?v=` 的数字一起 +1（`?v=3` → `?v=4`……）再推送。这几处分别是图标、样式表和一个脚本。URL 变了，浏览器就会当成新文件重新下载，绕开 4 小时的缓存。
3. **等**：什么都不做，最多 4 小时后所有浏览器都会自己更新。

> 第 2 条的 `?v=` 就是为了解决这个问题才加的——它对比的是 URL 而不是内容，所以只要数字变了就一定生效。
> 忘了加也不会出错，只是访问者最多晚 4 小时看到更新。

## 本地预览

```bash
# 在仓库根目录
python -m http.server 8000
# 打开 http://localhost:8000
```

也直接双击 `index.html` 打开——但注意 `file://` 下**外部链接点开没问题**，而有些浏览器会拦截跨域的 `file://` 跳转，所以调试链接行为时建议用上面的本地服务。

## 部署到 GitHub Pages

这个站点用 Pages 的 “Deploy from a branch” 模式发布，不需要任何 CI：

1. 修改后推送到 `main` 分支。
2. 仓库 **Settings → Pages**：Source 选 `Deploy from a branch`，Branch 选 `main`，目录选 `/ (root)`，保存。
3. 等一两分钟，访问 <https://home.prodhub.me/web-games/>（或 <https://produce123.github.io/web-games/>）。

之后每次推送 `main`，Pages 会自动重新发布，通常 1 分钟内生效。

## 许可

[MIT](LICENSE)