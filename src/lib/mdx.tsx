import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectMeta {
  title: string;
  description?: string; 
  date?: string;        
  company?: string; 
  role?: string;
  duration?: string;    
  year?: string;        
  image?: string;
  images?: string[];    
  status?: string;
}

const workDir = path.join(process.cwd(), 'src/content/work');
const projectsDir = path.join(process.cwd(), 'src/content/projects');

export async function getAllWork() {
  const files = fs.readdirSync(workDir);
  return files.map(file => {
    const { data } = matter(fs.readFileSync(path.join(workDir, file), 'utf8'));
    const meta = data as ProjectMeta;
    return { slug: file.replace(/\.mdx$/, ''), meta };
  }).sort((a, b) => {
    const dateB = new Date(b.meta.date ?? b.meta.year ?? "").getTime();
    const dateA = new Date(a.meta.date ?? a.meta.year ?? "").getTime();
    return dateB - dateA;
  });
}

export async function getWorkBySlug(slug: string) {
  const { data, content } = matter(fs.readFileSync(path.join(workDir, `${slug}.mdx`), 'utf8'));
  return { 
    meta: data as ProjectMeta, 
    content 
  };
}

export async function getAllProjects() {
  const files = fs.readdirSync(projectsDir);
  return files.map(file => {
    const { data } = matter(fs.readFileSync(path.join(projectsDir, file), 'utf8'));
    const meta = data as ProjectMeta;
    return { slug: file.replace(/\.mdx$/, ''), meta };
  }).sort((a, b) => {
    const dateB = new Date(b.meta.date ?? b.meta.year ?? "").getTime();
    const dateA = new Date(a.meta.date ?? a.meta.year ?? "").getTime();
    return dateB - dateA;
  });
}

export async function getProjectBySlug(slug: string) {
  const { data, content } = matter(fs.readFileSync(path.join(projectsDir, `${slug}.mdx`), 'utf8'));
  return { 
    meta: data as ProjectMeta, 
    content 
  };
}

export async function getNextProject(currentSlug: string, type: 'work' | 'projects' = 'projects') {
  const posts = type === 'work' ? await getAllWork() : await getAllProjects();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  
  const nextIndex = (currentIndex + 1) % posts.length;
  const nextPost = posts[nextIndex];

  return {
    slug: nextPost.slug,
    title: nextPost.meta.title,
  };
}