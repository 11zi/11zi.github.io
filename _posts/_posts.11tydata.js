import path from "node:path";

function slugify(value) {
  return String(value)
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase("zh-CN")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function dateParts(value) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function categoriesPath(categories) {
  if (!categories) return "";
  const values = Array.isArray(categories)
    ? categories
    : String(categories).split(/\s+/);
  const segments = values.map(slugify).filter(Boolean);
  return segments.length ? `${segments.join("/")}/` : "";
}

export default {
  eleventyComputed: {
    permalink(data) {
      const extension = path.extname(data.page.inputPath);
      const basename = path.basename(data.page.inputPath, extension);
      const postName = basename.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "");
      const date = dateParts(data.date);
      const categories = categoriesPath(data.categories);

      return `/${categories}${date.year}/${date.month}/${date.day}/${slugify(postName)}.html`;
    },
  },
};
