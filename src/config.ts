export const SITE = {
  website: "https://googleyixia.com/", // replace this with your deployed domain
  author: "Byron",
  profile: "",
  desc: "一个关于“认知自我，理解行为”的学习博客。致力于梳理和分享心理学（认知、行为、情绪）、大脑科学、习惯养成、健康生活及跨学科思维模型等知识。将复杂的理论拆解为学习笔记，记录探索过程中的洞见。",
  title: "Google一下",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: false,
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
