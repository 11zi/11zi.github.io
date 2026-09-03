const POST_GLOB = "./_posts/**/*.md";
const PAGE_SIZE = 5;

const site = {
  title: "yaoz",
  description: "备忘，总结，展示。",
  language: "zh-CN",
  author: "yaoz",
  pageSize: PAGE_SIZE,
};

function getPosts(collectionApi) {
  return collectionApi
    .getFilteredByGlob(POST_GLOB)
    .sort((left, right) => left.date - right.date);
}

function normalizeTags(tags) {
  if (!tags) return [];
  return (Array.isArray(tags) ? tags : [tags])
    .map((tag) => String(tag).trim())
    .filter(Boolean);
}

function slugify(value) {
  return String(value)
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase("zh-CN")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function collectTags(posts) {
  const groups = new Map();

  for (const post of posts) {
    for (const tag of normalizeTags(post.data.tags)) {
      if (!groups.has(tag)) groups.set(tag, []);
      groups.get(tag).push(post);
    }
  }

  return [...groups.entries()]
    .map(([name, taggedPosts]) => ({
      name,
      slug: slugify(name),
      count: taggedPosts.length,
      posts: taggedPosts,
    }))
    .sort((left, right) =>
      left.name.localeCompare(right.name, "zh-CN", { sensitivity: "base" }),
    );
}

function makePageLinks(baseUrl, totalPages) {
  return Array.from({ length: totalPages }, (_, index) => ({
    number: index + 1,
    url: index === 0 ? baseUrl : `${baseUrl}page/${index + 1}/`,
  }));
}

function paginate(posts, options) {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const pages = makePageLinks(options.baseUrl, totalPages);

  return pages.map((page, index) => ({
    title: index === 0 ? options.title : `${options.title} · 第 ${index + 1} 页`,
    heading: options.heading,
    activeTag: options.activeTag ?? "",
    posts: posts.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE),
    pageNumber: index + 1,
    totalPages,
    pages,
    url: page.url,
    outputPath: page.url === "/" ? "index.html" : `${page.url.slice(1)}index.html`,
    previousUrl: index > 0 ? pages[index - 1].url : null,
    nextUrl: index + 1 < totalPages ? pages[index + 1].url : null,
  }));
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addGlobalData("site", site);

  eleventyConfig.addFilter("displayDate", (value) =>
    new Intl.DateTimeFormat("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(value),
  );

  eleventyConfig.addFilter("htmlDate", (value) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(value),
  );

  eleventyConfig.addFilter("tagUrl", (tag) => `/tags/${slugify(tag)}/`);

  eleventyConfig.addCollection("posts", (collectionApi) => getPosts(collectionApi));

  eleventyConfig.addCollection("tagList", (collectionApi) =>
    collectTags(getPosts(collectionApi)),
  );

  eleventyConfig.addCollection("listingPages", (collectionApi) => {
    const postsNewestFirst = getPosts(collectionApi).toReversed();
    const homePages = paginate(postsNewestFirst, {
      baseUrl: "/",
      title: "主页",
      heading: "",
    });
    const tagPages = collectTags(postsNewestFirst).flatMap((tag) =>
      paginate(tag.posts, {
        baseUrl: `/tags/${tag.slug}/`,
        title: `标签：${tag.name}`,
        heading: `# ${tag.name}`,
        activeTag: tag.name,
      }),
    );

    return [...homePages, ...tagPages];
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
