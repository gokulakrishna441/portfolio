import { useEffect, useRef, useState } from 'react';

export function useScrollSpy(ids, offset = 100) {
  const [activeId, setActiveId] = useState(ids[0] || '');
  const observer = useRef(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: `-${offset}px 0px -55% 0px`, threshold: [0.15, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.current.observe(el));
    return () => observer.current?.disconnect();
  }, [ids, offset]);

  return activeId;
}
