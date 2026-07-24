import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollToTop from '../../common/ScrollToTop';

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isPortfolio = location.pathname === '/';

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={isPortfolio ? 'portfolio' : location.pathname}
          initial={isPortfolio ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isPortfolio ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}
    </>
  );
}
