import { useEffect } from 'react';

const useAnimation = () => {
  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.fade-in-left');
    fadeInElements.forEach((element) => {
      element.classList.add('animate');
    });
  }, []);
};

export default useAnimation;
