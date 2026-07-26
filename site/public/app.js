const channels = {
  youtube: "https://www.youtube.com/@%E9%92%9B%E5%94%87",
  bilibili: "https://space.bilibili.com/3706968275421396",
};

const videos = [
  {
    title: "安静的寄生虫",
    youtubeId: "TiVh7fJo49c",
    bvid: "",
    series: "末日系列",
    description: "写给抑郁与崩溃边缘的暗黑伤感歌。",
  },
  {
    title: "安静破蛹",
    youtubeId: "nky5alhZTu4",
    bvid: "",
    series: "末日系列",
    description: "我把自己从泥里拾捡，亲手还给了人间。",
  },
  {
    title: "末日同谋",
    youtubeId: "ioUxuPKV4zA",
    bvid: "",
    series: "末日系列",
    description: "废墟尽头，你不忍吃我，我不舍杀你。",
  },
  {
    title: "末日小同谋",
    youtubeId: "NenQhYSzNAQ",
    bvid: "",
    series: "末日系列",
    description: "写给废墟中孩子的摇篮曲。",
  },
  {
    title: "挪威的黑暗森林",
    youtubeId: "Xv6q4Q_q9ww",
    bvid: "",
    series: "黑色寓言",
    description: "一首走进黑暗森林的原创音乐视频。",
  },
  {
    title: "生活不止眼前的苟且吗",
    youtubeId: "JD1We7861q0",
    bvid: "",
    series: "人间噪音",
    description: "生活不止眼前的苟且，还有一辈子躲不开的风雪。",
  },
  {
    title: "后来就算了",
    youtubeId: "sN5owKZn2_M",
    bvid: "",
    series: "人间噪音",
    description: "爱过也该散了，你要带我看的世界说不定已经烂了。",
  },
  {
    title: "最爱是你",
    youtubeId: "oDHE2390Ohw",
    bvid: "",
    series: "反差情歌",
    description: "我就算有一百个男人，最爱还是你。",
  },
  {
    title: "莫名其妙的钱",
    youtubeId: "L2qzgQKz1hY",
    bvid: "",
    series: "反差情歌",
    description: "你能莫名其妙给我点钱吗。",
  },
  {
    title: "你没有骗我",
    youtubeId: "W6GY0M_oNPQ",
    bvid: "",
    series: "人间噪音",
    description: "原创苦情歌，动态歌词版。",
  },
];

const seriesMeta = {
  "末日系列": {
    mood: "废墟 / 寄生 / 破蛹",
    description: "把末日当作情绪现场，也当作重生的入口。",
  },
  "黑色寓言": {
    mood: "森林 / 童话 / 暗面",
    description: "带着童话外壳的暗色故事，走进森林，也走进人心背面。",
  },
  "人间噪音": {
    mood: "生活 / 风雪 / 算了",
    description: "把日常里的荒诞、疲惫和放手唱成旋律。",
  },
  "反差情歌": {
    mood: "甜 / 狠 / 好笑",
    description: "把情歌写到不太像情歌，越轻巧越刺痛。",
  },
};

const state = {
  platform: "youtube",
  openIndex: null,
};

const platformButtons = [...document.querySelectorAll(".platform-button")];
const regionCopy = document.querySelector("#region-copy");
const shelves = document.querySelector("#series-shelves");
const compactList = document.querySelector("#compact-list");

function youtubeEmbed(id) {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

function youtubeWatch(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function bilibiliEmbed(bvid) {
  return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&autoplay=0`;
}

function bilibiliWatch(bvid) {
  return bvid ? `https://www.bilibili.com/video/${bvid}` : channels.bilibili;
}

function thumbnail(video) {
  return `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
}

function platformName() {
  return state.platform === "bilibili" ? "Bilibili" : "YouTube";
}

function playerMarkup(video) {
  const youtubeUrl = youtubeWatch(video.youtubeId);
  const bilibiliUrl = bilibiliWatch(video.bvid);

  if (state.platform === "bilibili" && !video.bvid) {
    return `
      <div class="inline-player">
        <div class="player-fallback">
          <p>这首歌的 Bilibili 嵌入链接还没有录入。</p>
          <a href="${bilibiliUrl}" rel="noreferrer" target="_blank">打开 Bilibili 频道</a>
          <a href="${youtubeUrl}" rel="noreferrer" target="_blank">在 YouTube 播放</a>
        </div>
      </div>
    `;
  }

  const src = state.platform === "bilibili" ? bilibiliEmbed(video.bvid) : youtubeEmbed(video.youtubeId);
  return `
    <div class="inline-player">
      <iframe
        title="${video.title} 音乐视频"
        loading="lazy"
        src="${src}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div class="player-links">
        <a href="${youtubeUrl}" rel="noreferrer" target="_blank">YouTube</a>
        <a href="${bilibiliUrl}" rel="noreferrer" target="_blank">Bilibili</a>
      </div>
    </div>
  `;
}

function cardMarkup(video, index) {
  const isOpen = state.openIndex === index;
  return `
    <article class="video-card ${isOpen ? "is-open" : ""}" data-index="${index}">
      <button class="video-cover" type="button" data-action="toggle" aria-expanded="${isOpen}">
        <img src="${thumbnail(video)}" alt="">
        <span class="cover-shade"></span>
        <span class="play-chip">${isOpen ? "收起" : `用 ${platformName()} 播放`}</span>
      </button>
      <div class="video-body">
        <p class="series-label">${video.series}</p>
        <h3>${video.title}</h3>
        <p>${video.description}</p>
      </div>
      ${isOpen ? playerMarkup(video) : ""}
    </article>
  `;
}

function groupedVideos() {
  return videos.reduce((result, video, index) => {
    result[video.series] = result[video.series] || [];
    result[video.series].push({ video, index });
    return result;
  }, {});
}

function renderShelves() {
  const groups = groupedVideos();
  shelves.innerHTML = Object.entries(groups)
    .map(([name, items]) => {
      const meta = seriesMeta[name] || {
        mood: "原创音乐视频",
        description: "钛唇工作室原创音乐系列。",
      };

      return `
        <section class="series-shelf" aria-labelledby="series-${name}">
          <header class="shelf-header">
            <div>
              <p class="shelf-mood">${meta.mood}</p>
              <h3 id="series-${name}">${name}</h3>
            </div>
            <p>${meta.description}</p>
          </header>
          <div class="video-row">
            ${items.map(({ video, index }) => cardMarkup(video, index)).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  bindVideoCards();
}

function renderCompactList() {
  compactList.innerHTML = videos
    .map(
      (video, index) => `
        <button class="compact-item" type="button" data-index="${index}">
          <span>${video.series}</span>
          <strong>${video.title}</strong>
          <em>${video.description}</em>
        </button>
      `,
    )
    .join("");

  compactList.querySelectorAll(".compact-item").forEach((item) => {
    item.addEventListener("click", () => {
      state.openIndex = Number(item.dataset.index);
      renderShelves();
      const card = document.querySelector(`.video-card[data-index="${state.openIndex}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

function bindVideoCards() {
  document.querySelectorAll("[data-action='toggle']").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".video-card");
      const index = Number(card.dataset.index);
      state.openIndex = state.openIndex === index ? null : index;
      renderShelves();
      if (state.openIndex !== null) {
        document.querySelector(`.video-card[data-index="${index}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    });
  });
}

function applyPlatform(platform, source = "manual") {
  state.platform = platform;
  localStorage.setItem("titaniumlips-platform", platform);

  platformButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.platform === platform);
  });

  if (source === "geo") {
    regionCopy.textContent =
      platform === "bilibili"
        ? "检测到中国大陆访问，默认使用 Bilibili。"
        : "检测到海外访问，默认使用 YouTube。";
  } else {
    regionCopy.textContent = `当前默认播放平台：${platformName()}。`;
  }

  renderShelves();
}

async function detectPlatform() {
  const saved = localStorage.getItem("titaniumlips-platform");
  if (saved === "youtube" || saved === "bilibili") {
    applyPlatform(saved);
    return;
  }

  try {
    const response = await fetch("/api/region", { headers: { accept: "application/json" } });
    const data = await response.json();
    applyPlatform(data.country === "CN" ? "bilibili" : "youtube", "geo");
  } catch {
    const language = navigator.language || "";
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const prefersChina = language.toLowerCase().includes("zh-cn") || timeZone === "Asia/Shanghai";
    applyPlatform(prefersChina ? "bilibili" : "youtube", "geo");
  }
}

platformButtons.forEach((button) => {
  button.addEventListener("click", () => applyPlatform(button.dataset.platform));
});

renderShelves();
renderCompactList();
detectPlatform();
