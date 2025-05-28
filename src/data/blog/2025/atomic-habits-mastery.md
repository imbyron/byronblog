---
title: Inkflow Markdown：一次AI辅助开发的踩坑与实践之旅
author: Byron
pubDatetime: 2025-05-28T00:27:13.000+08:00
modDatetime: 
slug: inkflow-markdown-ai-assisted-development-journey
featured: true
draft: false
tags:
  - Markdown
  - Gemini
  - ChatGPT
  - PDF
  - AI
description: 记录我使用 Gemini 和 ChatGPT 等 AI 工具辅助开发开源 Markdown 转 PDF 工具 Inkflow 的真实过程，分享了 PDF 导出踩坑、window.print()解决方案以及用 AI 生成 Logo 和宣传图的 Prompt。
---

大家好，我是Byron。前段时间，因为一次不算太愉快的差旅经历(具体故事我在 V2EX [一次旅途中的小插曲，让我用AI做了个开源Markdown转PDF工具](https://v2ex.com/t/1134832) 里提过)，我萌生了开发一款在线Markdown转PDF工具的想法。这个项目的初衷很简单：满足个人在特定场景下的需求，同时，也想正儿八经地全程让AI（主要是Gemini和ChatGPT）深度参与开发，看看AI作为“编程搭档”的能耐到底如何。

项目取名 Inkflow(雅辑 Markdown)，目前已经开源在 GitHub [Inkflow-Markdown-Editor](https://github.com/imbyron/Inkflow-Markdown-Editor)，大家也可以直接访问 [https://markdown.googleyixia.com](https://markdown.googleyixia.com) 体验。

这篇博客，主要想记录一下开发过程中遇到的一些具体问题、我是如何“与AI共舞”以及一些“曲线救国”的小插曲。希望能给同样在探索AI辅助开发的朋友们提供一些真实的参考。

## 目录

## 小插曲一：PDF导出的“折腾”之路

我最初对PDF导出的设想是“所见即所得”，希望预览区的排版能尽可能完美地复刻到PDF中。

1.  **初探：AI推荐的PDF导出插件**
    最开始，我向AI描述了我的需求，它给我推荐了一个流行的前端PDF导出库。集成过程还算顺利，但实际效果却不尽如人意。
    * **问题1：内容压缩与过度留白**
        AI生成的初始代码，在处理较长的Markdown内容时，会把所有内容强行压缩到PDF的一页里。这导致当文章内容很多时，生成的PDF页面左右两侧会留下大片的空白，非常不美观。我和AI针对这个问题进行了好几轮“讨论”和代码调整，尝试了各种配置参数、分页逻辑，总算是让内容能够正常分页，排版看起来也舒服多了。
    * **问题2：渲染错位——线条与文字的“恩怨情仇”**
        好不容易解决了分页和留白，新的问题又冒了出来。在一些细节的渲染上，插件的表现不尽如人意。比如Markdown中的分隔线（三个短横线 `---`）和表格边框，在生成的PDF中，它们的位置会比正常的文字内容略微靠上一些。这就导致文字和分隔线、文字和表格线之间挨得特别近，甚至出现部分重叠的情况，非常影响阅读体验。

2.  **“死磕”与“放弃”：Google + AI 也束手无策**
    这个问题可把我给难住了。我又拉上AI，一起Google各种解决方案，尝试了调整CSS样式、修改插件内部渲染逻辑（在AI的帮助下理解了不少源码），甚至他又推荐了另外几个的库，但集成成本我觉得就太高了。

3.  **柳暗花明：回归浏览器本质——`window.print()`**
    就在我快要“放弃治疗”的时候，脑子里灵光一闪：浏览器自带的打印功能，不就能比较完美地将网页内容输出为PDF吗？而且它是真正意义上的“所见即所得”，能100%复刻网页上的渲染效果，包括CSS样式控制下的各种细节。

    于是，我果断调整方向，在 `pdfService.ts` 中改用 `window.print()` API。为了让打印效果更佳（比如去掉页眉页脚、控制边距等），我又和AI一起研究了 `@media print` CSS查询和打印相关的样式设置。最终，这个方案完美解决了之前的各种渲染和排版问题，虽然过程曲折，但结果令人满意。这也算是一个小小的教训：有时候最直接、最朴素的方法，反而最有效。

## 小插曲二：顺便，用ChatGPT生成了Logo与宣传图

除了核心代码，一个项目总得有点“门面”吧。Inkflow的Logo以及我之前在一些地方分享时用到的宣传图，其实也是AI的杰作。

我主要使用的是ChatGPT的图像生成能力。这里把我当时用的一些核心Prompt分享给大家，希望能给大家一点启发：

* **宣传图设计Prompt --- 当然，这个prompt也是AI写的:)**
    > A captivating promotional image for 'Inkflow Markdown Editor'. Showcase a clean, elegant split-screen user interface. The left pane features well-structured Markdown source code, including a clear heading, a list example, and a snippet of a Python code block with syntax highlighting. The right pane displays the beautifully rendered, real-time HTML preview of the same content, emphasizing a fresh, modern, and minimalist design aesthetic. Use a soothing and sophisticated color palette (e.g., soft blues, gentle greens, or light grays with a tasteful accent color). A subtle, stylized icon or visual cue should hint at the PDF export functionality. The overall mood should be calm, focused, inviting productivity and highlighting a comfortable, immersive user experience. Optionally, incorporate a subtle, abstract 'ink flow' graphic element in the background or as a design accent.

![Inkflow Markdown Editor](@/assets/2025/5/InkflowMarkdownEditor.png)
*<center>ChatGPT 生成的宣传图</center>*

* **生成Logo的Prompt**：
    > 我特别喜欢生成的icon，帮我将它转为透明的png图片，我想要128x128大小。

![Inkflow Markdown Logo](@/assets/2025/5/Logo.png)
*<center>ChatGPT 生成的 Logo</center>*

用AI生成设计素材，虽然可能不如专业设计师那么精细和富有创意，但对于个人开发者或者需要快速迭代原型的项目来说，确实是一个非常高效和低成本的选择。关键在于如何清晰、准确地向AI表达你的设计需求。

## 一些思考与总结

这次 Inkflow 的开发经历，让我对AI辅助编程有了更深的体会：

* **AI是得力助手，而非完全替代**：它能帮你快速搭建框架、生成重复性代码、提供解决思路，但最终的逻辑梳理、细节打磨和问题决策，还是离不开人的主导。
* **清晰的需求定义至关重要**：你向AI提问越精准，它给出的答案就越靠谱。学会“与AI对话”是一项新技能。
* **不要怕“踩坑”**：尤其是在尝试新技术或新方法时（比如我一开始执着于PDF插件），遇到问题是常态。解决问题的过程，本身就是学习和成长的过程。有时候，“曲线救国”反而能带来意外之喜。

Inkflow 目前功能还很简单，主要是为了满足我个人的核心需求和完成这次AI实验。我把它开源出来，更多的是想记录这次探索，如果它恰好能对你有所启发，或者在某个时刻能帮你解决一个小问题，我会非常开心。

欢迎大家在 [GitHub](https://github.com/imbyron/Inkflow-Markdown-Editor) 上关注它，或者提出宝贵的意见！
