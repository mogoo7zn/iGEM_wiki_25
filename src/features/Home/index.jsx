import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Banner from './components/Banner/Banner';
import One from './components/One/One';
import Two from './components/Two/Two';
import Three from './components/Three/Three';

const Home = () => {
  // 使用 useEffect 处理组件的动画
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

    // 观察所有需要动画的组件
    document.querySelectorAll('#one, #two, #three').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Banner />
      <One />
      <Two />
      <Three />
    </main>
  );
};

export default Home;
