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

const seriesDescriptions = {
  "末日系列": "废墟、寄生、破蛹与同谋。把末日当作情绪现场，也当作重生的入口。",
  "黑色寓言": "带着童话外壳的暗色故事，走进森林，也走进人心的背面。",
  "人间噪音": "生活、风雪、爱过和算了。把日常里的荒诞唱成旋律。",
  "反差情歌": "甜、狠、好笑、刺痛。把情歌写到不太像情歌。",
};

const state = {
  platform: "youtube",
  activeIndex: 0,
};

const player = document.querySelector("#video-player");
const fallback = document.querySelector("#player-fallback");
const activeSeries = document.querySelector("#active-series");
const activeTitle = document.querySelector("#active-title");
const activeDescription = document.querySelector("#active-description");
const youtubeLink = document.querySelector("#youtube-link");
const bilibiliLink = document.querySelector("#bilibili-link");
const platformButtons = [...document.querySelectorAll(".platform-button")];
const regionCopy = document.querySelector("#region-copy");
const seriesGrid = document.querySelector("#series-grid");
const videoGrid = document.querySelector("#video-grid");

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

function applyPlatform(platform, source = "manual") {
  state.platform = platform;
  localStorage.setItem("titaniumlips-platform", platform);
  platformButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.platform === platform);
  });

  if (source === "geo") {
    regionCopy.textContent =
      platform === "bilibili"
        ? "检测到中国大陆访问，已优先选择 Bilibili。"
        : "检测到海外访问，已优先选择 YouTube。";
  } else {
    regionCopy.textContent = `当前播放平台：${platform === "bilibili" ? "Bilibili" : "YouTube"}。`;
  }

  renderActiveVideo();
}

function renderActiveVideo() {
  const video = videos[state.activeIndex];
  activeSeries.textContent = video.series;
  activeTitle.textContent = video.title;
  activeDescription.textContent = video.description;
  youtubeLink.href = youtubeWatch(video.youtubeId);
  bilibiliLink.href = bilibiliWatch(video.bvid);

  if (state.platform === "bilibili") {
    if (video.bvid) {
      player.hidden = false;
      fallback.hidden = true;
      player.src = bilibiliEmbed(video.bvid);
    } else {
      player.hidden = true;
      player.removeAttribute("src");
      fallback.hidden = false;
    }
  } else {
    player.hidden = false;
    fallback.hidden = true;
    player.src = youtubeEmbed(video.youtubeId);
  }

  document.querySelectorAll(".video-card").forEach((card, index) => {
    card.classList.toggle("is-active", index === state.activeIndex);
  });
}

function renderSeries() {
  const groups = videos.reduce((result, video) => {
    result[video.series] = result[video.series] || [];
    result[video.series].push(video);
    return result;
  }, {});

  seriesGrid.innerHTML = Object.entries(groups)
    .map(
      ([name, items]) => `
        <article class="series-card">
          <p class="series-count">${items.length} 首作品</p>
          <h3>${name}</h3>
          <p>${seriesDescriptions[name] || "钛唇工作室原创音乐系列。"}</p>
        </article>
      `,
    )
    .join("");
}

function renderVideos() {
  videoGrid.innerHTML = videos
    .map(
      (video, index) => `
        <button class="video-card" type="button" data-index="${index}">
          <img src="https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg" alt="">
          <span class="video-card-body">
            <span class="series-label">${video.series}</span>
            <h3>${video.title}</h3>
            <p>${video.description}</p>
          </span>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.activeIndex = Number(card.dataset.index);
      renderActiveVideo();
      document.querySelector("#player-title").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
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

renderSeries();
renderVideos();
detectPlatform();
