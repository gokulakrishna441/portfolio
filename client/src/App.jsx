import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, AuthProvider } from './context';
import { PageLoader } from './components';
import { AppRoutes } from './routes';

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (booting) return <PageLoader />;

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
