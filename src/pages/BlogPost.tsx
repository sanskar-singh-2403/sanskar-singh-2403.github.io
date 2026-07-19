import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Reveal } from '../components/Reveal'
import { getPost, formatDate } from '../blog/posts'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <main>
        <section className="section" style={{ paddingTop: 200, minHeight: '80vh' }}>
          <p className="section-label">404</p>
          <h2 className="section-title">
            Post <span className="gradient-text">not found</span>
          </h2>
          <Link to="/blog" className="mono" style={{ color: 'var(--cyan)', fontSize: 14 }}>
            &larr; Back to all posts
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main>
      <article className="section blog-post" style={{ paddingTop: 170, maxWidth: 800 }}>
        <Reveal>
          <Link
            to="/blog"
            className="mono"
            style={{ color: 'var(--muted)', fontSize: 13, letterSpacing: '0.05em' }}
          >
            &larr; All posts
          </Link>

          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: '0.15em',
              color: post.accent,
              margin: '28px 0 16px',
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <span>{formatDate(post.date).toUpperCase()}</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>{post.readingMinutes} MIN READ</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(30px, 5vw, 46px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: 22,
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {post.tags.map((t) => (
              <span
                key={t}
                className="mono"
                style={{
                  fontSize: 11,
                  padding: '5px 12px',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  letterSpacing: '0.05em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
            <Link to="/blog" className="mono" style={{ color: 'var(--cyan)', fontSize: 14 }}>
              &larr; Back to all posts
            </Link>
          </div>
        </Reveal>
      </article>
    </main>
  )
}
