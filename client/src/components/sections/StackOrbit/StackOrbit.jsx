import { useReducedMotion } from 'framer-motion';
import './StackOrbit.css';

const STACK = [
  'React',
  'Node.js',
  'MongoDB',
  'Express',
  'Redux',
  'JWT',
  'Socket.io',
  'TypeScript',
  'Redis',
  'AWS',
];

export default function StackOrbit() {
  const reduce = useReducedMotion();

  return (
    <div className={`stack-orbit ${reduce ? 'is-static' : ''}`} aria-hidden="true">
      <div className="stack-orbit__core">
        <span className="stack-orbit__mark">GK</span>
        <span className="stack-orbit__pulse" />
      </div>

      <div className="stack-orbit__ring stack-orbit__ring--outer">
        {STACK.map((label, i) => {
          const angle = (360 / STACK.length) * i;
          return (
            <span
              key={label}
              className="stack-orbit__chip"
              style={{
                '--angle': `${angle}deg`,
                '--delay': `${i * 0.08}s`,
              }}
            >
              {label}
            </span>
          );
        })}
      </div>

      <div className="stack-orbit__ring stack-orbit__ring--inner">
        <span className="stack-orbit__dot" />
        <span className="stack-orbit__dot" />
        <span className="stack-orbit__dot" />
        <span className="stack-orbit__dot" />
      </div>

      <div className="stack-orbit__floor" />
    </div>
  );
}
