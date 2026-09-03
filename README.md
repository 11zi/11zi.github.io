> 其实搭建一个博客是很简单的事情，坚持总结和写作才是最难的事。

# yaoz

使用 Eleventy 和 GitHub Pages 的个人博客。文章、标签页、分页和相邻文章导航都在构建时生成，访客端不需要 JavaScript。

## 写文章

在 `_posts` 中新建 `YYYY-MM-DD-标题.md`，并添加 Front Matter：

```yaml
---
layout: post
title: 文章标题
date: 2026-09-02T10:00:00+08:00
author: yaoz
excerpt: 显示在首页的摘要
tags: [Code, Art]
---
```

左侧标签、数量和标签分页根据所有文章的 `tags` 自动生成，不需要维护独立的标签列表。

## 本地预览

安装 Node.js 18 或更高版本后执行：

```shell
corepack enable
pnpm install
pnpm start
```

然后打开 `http://localhost:8080`。Eleventy 会监听文件变化并自动刷新。生产构建使用 `pnpm build`。

## 主要结构

- `eleventy.config.js`：站点、文章集合、标签和分页配置。
- `_posts/`：Markdown 文章，沿用原来的文件结构。
- `_includes/layouts/`：站点和文章布局。
- `_includes/components/`：可复用的文章列表模板。
- `listing-pages.njk`：首页和标签分页入口。
- `assets/css/style.css`：站点样式。
- `.github/workflows/deploy-pages.yml`：GitHub Pages 自动构建与发布。

## 参考

- [Eleventy 文档](https://www.11ty.dev/docs/)
- [Eleventy 集合](https://www.11ty.dev/docs/collections/)
- [Eleventy 分页](https://www.11ty.dev/docs/pagination/)
- [GitHub Pages 自定义工作流](https://docs.github.com/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
