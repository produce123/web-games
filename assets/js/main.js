/* 大厅逻辑：把 assets/js/games.js 里的清单渲染成卡片。
   没有任何依赖、没有构建步骤，所以在 GitHub Pages 上开箱即用。 */
(function () {
  "use strict";

  var grid = document.getElementById("grid");
  var toolbar = document.getElementById("toolbar");
  var search = document.getElementById("search");
  var count = document.getElementById("count");
  var year = document.getElementById("year");

  if (!grid) return;

  var games = Array.isArray(window.GAMES) ? window.GAMES : [];

  /* ---------- 渲染 ---------- */
  function cardOf(game) {
    var online = Boolean(game.url);
    var card = document.createElement("article");
    card.className = "game-card" + (online ? "" : " is-soon");

    var icon = document.createElement("div");
    icon.className = "card-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = game.icon || "🎮";
    card.appendChild(icon);

    var body = document.createElement("div");
    body.className = "card-body";

    var title = document.createElement("h3");
    title.appendChild(document.createTextNode(game.title || "未命名"));
    if (!online) {
      var badge = document.createElement("span");
      badge.className = "pill";
      badge.textContent = "待部署";
      title.appendChild(badge);
    }
    body.appendChild(title);

    if (game.desc) {
      var desc = document.createElement("p");
      desc.textContent = game.desc;
      body.appendChild(desc);
    }

    if (game.tags && game.tags.length) {
      var tags = document.createElement("div");
      tags.className = "card-tags";
      game.tags.forEach(function (tag) {
        var pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = tag;
        tags.appendChild(pill);
      });
      body.appendChild(tags);
    }

    var actions = document.createElement("div");
    actions.className = "card-actions";

    if (online) {
      var play = document.createElement("a");
      play.className = "btn btn-primary";
      play.href = game.url;
      // 本站是导航页，游戏都在别的仓库/域名下，所以新标签打开
      play.target = "_blank";
      play.rel = "noopener";
      play.textContent = "开始游戏";
      actions.appendChild(play);
    }

    if (game.repo) {
      var repo = document.createElement("a");
      repo.className = "btn";
      repo.href = game.repo;
      repo.target = "_blank";
      repo.rel = "noopener";
      repo.textContent = "源码";
      actions.appendChild(repo);
    }

    if (actions.childNodes.length) body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  function emptyState(title, hint) {
    var box = document.createElement("div");
    box.className = "empty";
    var strong = document.createElement("strong");
    strong.textContent = title;
    box.appendChild(strong);
    box.appendChild(document.createTextNode(hint));
    return box;
  }

  function render(list) {
    grid.textContent = "";

    if (!list.length) {
      grid.appendChild(
        games.length
          ? emptyState("没有匹配的游戏", "换个关键词试试。")
          : emptyState("还没有游戏", "在 assets/js/games.js 里添加一条数据就会出现在这里。")
      );
      return;
    }

    list.forEach(function (game) {
      grid.appendChild(cardOf(game));
    });
  }

  /* ---------- 搜索：游戏少的时候不显示搜索框，免得占地方 ---------- */
  function matches(game, keyword) {
    if (!keyword) return true;
    var haystack = [game.title, game.desc]
      .concat(game.tags || [])
      .join(" ")
      .toLowerCase();
    return haystack.indexOf(keyword) !== -1;
  }

  if (toolbar && search) {
    if (games.length >= 4) {
      toolbar.hidden = false;
      search.addEventListener("input", function () {
        render(games.filter(function (g) {
          return matches(g, search.value.trim().toLowerCase());
        }));
      });
    } else {
      toolbar.hidden = true;
    }
  }

  /* ---------- 页脚与计数 ---------- */
  if (count) count.textContent = String(games.length);
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 卡片高光跟随鼠标 ---------- */
  grid.addEventListener("pointermove", function (event) {
    var card = event.target.closest(".game-card");
    if (!card) return;
    var rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", event.clientX - rect.left + "px");
    card.style.setProperty("--my", event.clientY - rect.top + "px");
  });

  render(games);
})();