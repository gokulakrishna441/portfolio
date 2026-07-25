import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './DepthField.css';

const SHAPES = [
  { type: 'cube', x: 12, y: 18, z: 80, size: 1, speed: 0.35 },
  { type: 'ring', x: 78, y: 22, z: 40, size: 1.2, speed: 0.28 },
  { type: 'pyramid', x: 86, y: 68, z: 110, size: 0.9, speed: 0.42 },
  { type: 'cube', x: 18, y: 72, z: 60, size: 0.75, speed: 0.3 },
  { type: 'ring', x: 48, y: 42, z: 150, size: 1.4, speed: 0.22 },
  { type: 'node', x: 62, y: 82, z: 90, size: 0.85, speed: 0.38 },
  { type: 'cube', x: 34, y: 12, z: 130, size: 0.7, speed: 0.45 },
  { type: 'node', x: 8, y: 48, z: 70, size: 1, speed: 0.33 },
];

function useDesktopMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px) and (pointer: fine)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return enabled;
}

export default function DepthField() {
  const reduce = useReducedMotion();
  const desktop = useDesktopMotion();
  const rootRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    if (reduce || !desktop) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const nodes = [...root.querySelectorAll('[data-shape]')];

    const onPointer = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      pointer.current = {
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      };
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    const tick = () => {
      const { x, y } = pointer.current;
      const sy = scrollY.current;
      nodes.forEach((node, i) => {
        const meta = SHAPES[i];
        if (!meta) return;
        const depth = meta.z / 160;
        const drift = Math.sin(sy * 0.0015 + i) * 12 * meta.speed;
        const rx = y * -18 * depth + drift * 0.4;
        const ry = x * 22 * depth;
        const tx = x * -28 * depth;
        const ty = y * -20 * depth + Math.cos(sy * 0.0012 + i * 0.7) * 10;
        node.style.transform = `translate3d(${tx}px, ${ty + drift}px, ${-meta.z}px) rotateX(${rx}deg) rotateY(${ry + sy * 0.02 * meta.speed}deg) scale(${meta.size})`;
      });
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduce, desktop]);

  if (reduce || !desktop) return null;

  return (
    <div className="depth-field" aria-hidden="true" ref={rootRef}>
      <div className="depth-field__stage">
        {SHAPES.map((shape, i) => (
          <span
            key={`${shape.type}-${i}`}
            data-shape
            className={`depth-shape depth-shape--${shape.type}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `translateZ(${-shape.z}px) scale(${shape.size})`,
              animationDuration: `${18 + i * 2.4}s`,
            }}
          />
        ))}
        <svg className="depth-field__flow" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            className="depth-field__path depth-field__path--a"
            d="M-40,180 C220,40 380,420 620,280 S980,80 1240,260"
          />
          <path
            className="depth-field__path depth-field__path--b"
            d="M-20,520 C260,680 420,360 680,520 S1020,720 1260,480"
          />
        </svg>
      </div>
    </div>
  );
}
