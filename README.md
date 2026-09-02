> 其实搭建一个博客是很简单的事情，坚持总结和写作才是最难的事。

# yaoz

使用 Jekyll 和 GitHub Pages 的个人博客。首页在构建时读取 `_posts`，再由浏览器端脚本完成按标签筛选和分页。

## 写文章

在 `_posts` 中新建 `YYYY-MM-DD-标题.md`，并添加 Front Matter：

```yaml
---
layout: post
title: 文章标题
date: 2026-09-02 10:00:00
author: yaoz
excerpt: 显示在首页的摘要
tags: [Code, Art]
---
```

标签筛选项由 Jekyll 根据所有文章的 `tags` 自动生成，不需要修改 `index.html`。每页文章数在 `_config.yml` 的 `posts_per_page` 中设置。

## 本地预览

安装 Ruby 后执行：

```shell
bundle install
bundle exec jekyll serve
```

然后打开 `http://localhost:4000`。修改 `_config.yml` 后需要重启 Jekyll。

## 主要结构

- `_config.yml`：站点配置。
- `_posts/`：Markdown 文章。
- `index.html`：首页 Liquid/HTML 模板。
- `assets/js/blog-index.js`：筛选、分页和 URL 状态。
- `assets/css/style.scss`：主题样式和项目自定义样式。

## 参考

- [Jekyll 文档](https://jekyllrb.com/docs/)
- [GitHub Pages 与 Jekyll](https://docs.github.com/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
- [Minimal 主题](https://github.com/pages-themes/minimal)
