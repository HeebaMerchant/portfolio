import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, hash, state } = location;
  
  useEffect(() => {
    // Don't scroll to top if:
    // 1. There's a hash in the URL
    // 2. Navigation state indicates we should scroll to projects section
    if (!hash && !state?.scrollToProjects) {
      // Force instant scroll by disabling smooth behavior
      const htmlElement = document.documentElement;
      htmlElement.style.scrollBehavior = 'auto';
      
      // Multiple scroll attempts to ensure it works
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      
      // Immediate scroll
      scrollToTop();
      
      // Use requestAnimationFrame to ensure it happens after render
      requestAnimationFrame(() => {
        scrollToTop();
        
        // Double-check after a tiny delay
        setTimeout(() => {
          scrollToTop();
          // Restore smooth scrolling
          htmlElement.style.scrollBehavior = 'smooth';
        }, 0);
      });
    }
  }, [pathname, hash, state]);
  
  return null;
};

export default ScrollToTop; 