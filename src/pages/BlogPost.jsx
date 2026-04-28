import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import NotFound from './NotFound';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <NotFound />;

  const readTime = Math.ceil(post.content.split(' ').length / 200);

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="blog-post-page">
      {/* Header Section */}
      <header className="blog-post-header">
        <img src={post.image} alt={post.title} className="blog-post-hero-image" />
        <div className="blog-post-header-content">
          <div className="container">
            <Link to="/blog" className="back-to-blog">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Blog
            </Link>
            <div className="blog-post-meta">
              <span className="blog-post-category">{post.category}</span>
              <span className="blog-post-date">{post.date}</span>
              <span className="blog-post-readtime" style={{ color: 'rgba(255,255,255,0.5)' }}>• {readTime} min read</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="blog-post-container">
        <article className="blog-post-body">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Sidebar */}
        <aside className="blog-post-sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title">About the Author</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              <strong>{post.author}</strong> is a high-end Full-Stack Developer and Digital Strategist specialized in premium brand experiences and AI integration.
            </p>
          </div>

          {relatedPosts.length > 0 && (
            <div className="sidebar-widget">
              <h3 className="widget-title">Related Insight</h3>
              <div className="related-posts-list">
                {relatedPosts.map(rp => (
                  <Link key={rp.id} to={`/blog/${rp.slug}`} className="related-post-item">
                    <span className="related-post-date">{rp.date}</span>
                    <span className="related-post-title">{rp.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-widget">
            <h3 className="widget-title">Need a Project?</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
              Ready to build something extraordinary with the latest technology?
            </p>
            <Link to="/contact" className="blog-filter-tab active" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Let's Talk
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogPost;
