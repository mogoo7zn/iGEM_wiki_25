import { useEffect } from 'react';

/**
 * A custom hook that handles fade-in-left animation effects on elements.
 * This hook automatically adds the 'animate' class to all elements with 'fade-in-left' class
 * when the component mounts.
 *
 * @returns {void}
 *
 * @example
 * function MyComponent() {
 *   useAnimation();
 *   return <div className="fade-in-left">Animated content</div>;
 * }
 */
const useAnimation = () => {
  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.fade-in-left');
    fadeInElements.forEach((element) => {
      element.classList.add('animate');
    });
  }, []);
};

export default useAnimation;
