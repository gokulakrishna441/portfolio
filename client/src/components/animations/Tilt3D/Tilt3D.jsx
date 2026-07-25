import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import './Tilt3D.css';

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px) and (pointer: fine)');
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return fine;
}

export default function Tilt3D({
  children,
  className = '',
  max = 12,
  glare = true,
  scale = 1.02,
}) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = !reduce && fine;
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 20 });
  const springY = useSpring(y, { stiffness: 220, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-max, max]);
  const glareX = useTransform(springX, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(springY, [-0.5, 0.5], [10, 90]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 55%)`;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt3d ${className}`.trim()}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="tilt3d__inner" style={{ transform: 'translateZ(28px)' }}>
        {children}
      </div>
      {glare && <motion.div className="tilt3d__glare" style={{ background: glareBg }} aria-hidden="true" />}
    </motion.div>
  );
}
