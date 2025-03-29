import React, { useEffect } from 'react';

// This component loads non-critical styles after initial render
const NonCriticalStyles = () => {
  useEffect(() => {
    // Create link for font-awesome CSS
    const linkFA = document.createElement('link');
    linkFA.rel = 'stylesheet';
    linkFA.href = '/assets/css/font-awesome.min.css';
    document.head.appendChild(linkFA);

    // Any other non-critical assets can be loaded here
  }, []);

  return null; // This component doesn't render anything
};

export default NonCriticalStyles;
