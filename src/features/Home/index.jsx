import React, { useEffect } from 'react';
import { lazy, Suspense } from 'react';

// 使用 lazy 导入优化性能
const HomeBanner = lazy(() => import('./components/Banner/Banner'));
const One = lazy(() => import('./components/One/One'));
const Two = lazy(() => import('./components/Two/Two'));
const Three = lazy(() => import('./components/Three/Three'));
const Four = lazy(() => import('./components/Four/Four'));
const Five = lazy(() => import('./components/Five/Five'));

const Home = () => {
  useEffect(() => {
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

    document.querySelectorAll('#one, #two, #three, #four, #five').forEach(
      (el) => observer.observe(el)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeBanner />
        <One />
        <Two />
        <Three />
        <Four />
        <Five />
      </Suspense>
    </main>
  );
};

export default Home;