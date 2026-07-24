import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="page not-found">
      <SEO title="Page not found" description="The page you requested does not exist." />
      <section className="section">
        <div className="container not-found__inner">
          <p className="eyebrow">404</p>
          <h1 className="section-title">This page wandered off.</h1>
          <p className="section-lead">The route you requested is not part of this portfolio.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
            Back home
          </Link>
        </div>
      </section>
    </div>
  );
}
