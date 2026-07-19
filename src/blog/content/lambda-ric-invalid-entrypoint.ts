import type { BlogPost } from '../posts'
import content from './lambda-ric-invalid-entrypoint.md?raw'

export const lambdaRicInvalidEntrypoint: BlogPost = {
  slug: 'lambda-ric-invalid-entrypoint',
  title: 'The Empty String That Broke a Lambda: A Deep Dive into the Runtime Interface Client',
  summary:
    'A container-image Lambda kept failing with Runtime.InvalidEntrypoint and no logs. The image was provably perfect. The bug was a single empty string in the function config — and the hunt is a tour through how container Lambdas actually boot.',
  date: '2026-07-19',
  readingMinutes: 11,
  tags: ['AWS Lambda', 'Docker', 'TypeScript', 'Debugging', 'DevOps'],
  accent: '#00f0ff',
  content,
}
