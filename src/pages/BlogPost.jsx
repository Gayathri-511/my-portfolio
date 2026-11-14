import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import blog from '../data/blog';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function readingTime(paragraphs) {
  const words = paragraphs.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function BlogPost() {
  const { slug } = useParams();
  const post = blog.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <>
        <Nav />
        <main className="case-study">
          <p>Post not found.</p>
          <Link className="text-link" to="/blog">
            ← Back to blog
          </Link>
        </main>
        <CTA />
        <Footer />
      </>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <Nav />
      <main className="case-study blog-post">
        <Link className="back-link" to="/blog">
          ← Back to blog
        </Link>

        <span className="blog-tag">{post.tag}</span>
        <h1 className="case-title blog-post-title">{post.title}</h1>

        <div className="blog-thumb case-thumb" />

        <div className="case-layout">
          <article className="blog-body">
            {post.content.map((paragraph, i) => (
              <p className={`blog-paragraph${i === 0 ? ' blog-paragraph-lead' : ''}`} key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="case-toc blog-sidebar">
            <div className="blog-sidebar-card">
              <span className="blog-avatar" aria-hidden="true">
                G
              </span>
              <p className="blog-sidebar-name">Gayathri RK</p>
              <p className="blog-sidebar-meta">
                {formatDate(post.date)} · {readingTime(post.content)} min read
              </p>
              <p className="blog-sidebar-bio">
                QA &amp; business analyst writing about testing, requirements, and turning bugs into
                business conversations.
              </p>
            </div>

            <div>
              <span className="case-toc-label">Share this post</span>
              <div className="blog-share-links">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  X ↗
                </a>
                <button className="blog-share-copy" onClick={copyLink}>
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <CTA />
      <Footer />
    </>
  );
}

export default BlogPost;
