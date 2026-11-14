import { Link } from 'react-router-dom';
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

function Blog() {
  return (
    <>
      <Nav />
      <main>
        <section className="blog-hero">
          <p className="tag">Blog</p>
          <h1 className="about-title">Notes on QA, testing, and business analysis.</h1>
        </section>
        <section className="blog-list">
          {blog.map((post) => (
            <Link className="blog-card" to={`/blog/${post.slug}`} key={post.slug}>
              <div className="blog-thumb" />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-tag">{post.tag}</span>
                  <span className="blog-date">{formatDate(post.date)}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="text-link">Read post ↗</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <CTA />
      <Footer />
    </>
  );
}

export default Blog;
