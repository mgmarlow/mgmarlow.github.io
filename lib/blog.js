import matter from 'gray-matter'
import { parseISO, format } from 'date-fns'
import fs from 'fs'
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'content', 'articles')

export function getPostBySlug(fileName) {
  const slug = fileName.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)
  const date = format(parseISO(data.date), 'yyyy-MM-dd')

  return { slug, frontmatter: { ...data, date }, content }
}

export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory)
  const posts = files
    .map((fileName) => getPostBySlug(fileName))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))

  return posts
}
