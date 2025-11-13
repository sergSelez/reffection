'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// import { useLocation } from 'react-router-dom';

function ScrollToHash() {
  const { hash } = usePathname();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
    }
  }, [hash]);

  return null; // Просто вспомогательный компонент
}

export default ScrollToHash;
