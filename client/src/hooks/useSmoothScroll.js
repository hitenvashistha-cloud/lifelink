import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href === '#' || href === '') return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      window.history.pushState(null, '', href);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
}