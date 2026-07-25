import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const offsets = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -20 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  scale: { x: 0, y: 16, scale: 0.96 },
};

export default function Reveal({
  children,
  delay = 0,
  y,
  direction = 'up',
  className = '',
  as: Component = motion.div,
  once = true,
  amount = 0.2,
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = Component === motion.div ? 'div' : Component;
    return <Tag className={className}>{children}</Tag>;
  }

  const base = offsets[direction] || offsets.up;
  const initialY = typeof y === 'number' ? y : base.y;

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        x: base.x,
        y: initialY,
        scale: base.scale ?? 1,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

export function Stagger({ children, className = '', stagger = 0.08, delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up' }) {
  const reduce = useReducedMotion();
  const base = offsets[direction] || offsets.up;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: base.x, y: base.y, scale: base.scale ?? 1 },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
