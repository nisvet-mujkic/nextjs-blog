import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const result = matter(content);

    return {
      id,
      ...result.data,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const filePath = path.join(postsDirectory, `${id}.md`);
  const content = fs.readFileSync(filePath, "utf-8");

  const result = matter(content);

  const processedContent = await remark().use(html).process(result.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...result.data,
  };
}
