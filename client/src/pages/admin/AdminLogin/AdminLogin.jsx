import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import SEO from '../../../components/common/SEO';
import '../styles/Admin.css';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login page">
      <SEO title="Admin Login" />
      <form className="glass admin-login__card" onSubmit={onSubmit}>
        <p className="eyebrow">Admin</p>
        <h1>Sign in</h1>
        <p className="admin-login__hint">Manage projects, skills, experience, and resume.</p>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
