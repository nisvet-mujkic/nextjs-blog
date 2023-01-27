import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
