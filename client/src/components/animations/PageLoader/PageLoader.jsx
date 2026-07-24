import { motion } from 'framer-motion';
import './PageLoader.css';

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading">
      <motion.div
        className="page-loader__mark"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
      >
        GK
      </motion.div>
      <motion.div
        className="page-loader__bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
