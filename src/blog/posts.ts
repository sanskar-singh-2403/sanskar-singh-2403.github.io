export interface BlogPost {
  slug: string
  title: string
  summary: string
  date: string // ISO
  readingMinutes: number
  tags: string[]
  accent: string
  content: string // markdown
}

import { lambdaRicInvalidEntrypoint } from './content/lambda-ric-invalid-entrypoint'

export const posts: BlogPost[] = [lambdaRicInvalidEntrypoint]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
