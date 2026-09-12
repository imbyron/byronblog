import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { unified } from "@astrojs/markdown-remark";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    // Astro 7 defaults to the native Sätteri processor; keep the unified
    // pipeline so our remark plugins (目录 TOC) keep working.
    processor: unified({
      remarkPlugins: [
        // 明确告诉 remarkToc 寻找 '目录' 标题
        [remarkToc, { heading: "目录" }],
        // 继续让 remarkCollapse 作用于 '目录' 标题
        [remarkCollapse, { test: "目录" }],
      ],
    }),
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    // `experimentalLayout` graduated to `image.layout` in Astro 6/7.
    layout: "full-width",
    responsiveStyles: true,
  },
  // Restore pre-v7 HTML whitespace rules (v7 defaults to 'jsx' which strips
  // spaces between inline elements and can merge CJK text).
  compressHTML: true,
});
