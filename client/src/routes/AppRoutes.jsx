import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout, PageLoader } from '../components';
import { ProtectedRoute } from '../pages/admin';
import { scrollToSection } from '../utils/scroll';

const Portfolio = lazy(() => import('../pages/Portfolio'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const NotFound = lazy(() => import('../pages/NotFound'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));

function HashRedirect({ section }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && section) {
      const t = setTimeout(() => scrollToSection(section), 150);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [location.pathname, section]);

  return <Navigate to={section ? `/#${section}` : '/'} replace />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Portfolio />} />
          <Route path="about" element={<HashRedirect section="about" />} />
          <Route path="skills" element={<HashRedirect section="skills" />} />
          <Route path="experience" element={<HashRedirect section="experience" />} />
          <Route path="projects" element={<HashRedirect section="projects" />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="education" element={<HashRedirect section="education" />} />
          <Route path="certifications" element={<HashRedirect section="education" />} />
          <Route path="resume" element={<HashRedirect section="resume" />} />
          <Route path="contact" element={<HashRedirect section="contact" />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin" element={<ProtectedRoute />}>
            <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
