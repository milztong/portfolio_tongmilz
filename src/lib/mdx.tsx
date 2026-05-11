import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Gemeinsame Schnittstelle für die Metadaten von Projekten und Arbeiten
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

// Verzeichnisse für Arbeitsstellen und Projekte
const workDir = path.join(process.cwd(), 'src/content/work');
// Verzeichnis für Projekte
const projectsDir = path.join(process.cwd(), 'src/content/projects');

// Funktionen zum Abrufen von Arbeitsstellen und Projekten sowie deren Details
export async function getAllWork() {
  const files = fs.readdirSync(workDir);
  // Lese alle Dateien im Arbeitsverzeichnis, extrahiere die Metadaten und sortiere sie nach Datum
  return files.map(file => {
    const { data } = matter(fs.readFileSync(path.join(workDir, file), 'utf8'));
    const meta = data as ProjectMeta;
    // Entferne die Dateiendung .mdx, um den Slug zu erhalten
    return { slug: file.replace(/\.mdx$/, ''), meta };
  }).sort((a, b) => {
    const dateB = new Date(b.meta.date ?? b.meta.year ?? "").getTime();
    const dateA = new Date(a.meta.date ?? a.meta.year ?? "").getTime();
    return dateB - dateA;
  });
}

// Funktion zum Abrufen der Details einer bestimmten Arbeitsstelle anhand des Slugs
export async function getWorkBySlug(slug: string) {
  // Lese die entsprechende MDX-Datei, extrahiere die Metadaten und den Inhalt
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

// Funktion zum Abrufen des nächsten Projekts basierend auf dem aktuellen Slug
export async function getNextProject(currentSlug: string, type: 'work' | 'projects' = 'projects') {
  // Je nach Typ (Arbeit oder Projekt) wird die entsprechende Liste abgerufen
  const posts = type === 'work' ? await getAllWork() : await getAllProjects();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  // Berechne den Index des nächsten Projekts, indem der aktuelle Index um 1 erhöht und modulo der Anzahl der Projekte genommen wird
  const nextIndex = (currentIndex + 1) % posts.length;
  const nextPost = posts[nextIndex];

  return {
    slug: nextPost.slug,
    title: nextPost.meta.title,
  };
}