import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const target = document.getElementById('one');
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      const targetPosition =
        (target?.getBoundingClientRect().top || 0) + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('#one, #two, #three');
    sections.forEach((section) => observer.observe(section));

    const scrollButton = document.querySelector('.button.alt');
    scrollButton?.addEventListener('click', handleScroll);

    return () => {
      scrollButton?.removeEventListener('click', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);
};

export default useScrollAnimation;
