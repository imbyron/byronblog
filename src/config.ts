export const SITE = {
  website: "https://googleyixia.com/", // replace this with your deployed domain
  author: "Byron",
  profile: "",
  desc: "「Google一下」是一个由Byron创建的多元学习博客，专注于探索认知科学、行为心理学、习惯养成及AI等前沿科技，分享学习洞见与实践方法。",
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
