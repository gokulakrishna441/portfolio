import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scrollToSection } from '../../../utils/scroll';
import './ScrollToTop.css';

export default function ScrollToTop({ threshold = 420 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="scroll-top"
          aria-label="Scroll to top"
          title="Back to top"
          onClick={() => scrollToSection('home')}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M12 5l7 7-1.4 1.4L13 8.8V19h-2V8.8L6.4 13.4 5 12l7-7z"
              fill="currentColor"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
