/* ==========================================================================
   导航清单 —— 这个仓库唯一的「内容」文件
   --------------------------------------------------------------------------
   加一个新游戏/新页面：复制下面任意一条，改成自己的内容即可，其他文件都不用动。

   每条数据的字段：
     title   必填  卡片标题
     desc    可选  一句话介绍
     url     可选  线上网页地址。留空表示网页还没部署，卡片会显示「待部署」并置灰
     repo    可选  源码仓库地址，填了就会多一个「源码」按钮
     icon    可选  一个 emoji，显示在卡片左侧
     tags    可选  标签数组，搜索时会一起匹配
     action  可选  主按钮的文字，默认「开始游戏」；不是游戏就写「访问」「打开」之类
     pinned  可选  写 true 会置顶显示（不管它在数组里的位置）

   参考：如果游戏仓库叫 my-game，并且开启了 Pages，那么 url 一般就是
   https://home.prodhub.me/my-game/

   注意（缓存）：GitHub Pages 把 assets/ 下的文件强缓存 4 小时（HTML 只有 10 分钟）。
   改完这个文件后如果刷新页面看不到变化，把 index.html 里几处 ?v= 的数字一起 +1
   再推送即可；临时想立刻看效果按 Ctrl+Shift+R 强刷。
   ========================================================================== */

window.GAMES = [
  {
    title: "个人主页",
    desc: "我的个人站点：项目、说说、音乐。",
    url: "https://home.prodhub.me/",
    repo: "https://github.com/produce123/produce123.github.io",
    icon: "🏠",
    tags: ["个人主页"],
    action: "访问", // 不是游戏，所以按钮写「访问」
    pinned: true, // 置顶
  },
  {
    title: "大炮轰小鬼",
    desc: "Cannon Goblin · 纯静态棋盘游戏，联机走 WebRTC 点对点直连，不需要服务器。",
    url: "https://home.prodhub.me/Cannon-Goblin/",
    repo: "https://github.com/produce123/Cannon-Goblin",
    icon: "💥",
    tags: ["棋盘", "WebRTC 联机", "零依赖"],
  },
  {
    title: "Shell Gambit",
    desc: "恶魔轮盘聚会版 · 纯前端 WebRTC 多人联机霰弹枪轮盘，2–4 人，零依赖、不需要服务器。",
    url: "https://home.prodhub.me/shell-gambit/",
    repo: "https://github.com/produce123/shell-gambit",
    icon: "💀",
    tags: ["多人联机", "WebRTC", "派对"],
  },
];