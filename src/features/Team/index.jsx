import React, { useEffect } from 'react';
import Banner from './components/Banner/Banner';
import Members from './components/Members/Members';
import Roles from './components/Roles/Roles';

const Team = () => {
  useEffect(() => {
    // 添加滚动动画
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

    // 观察需要动画的组件
    document.querySelectorAll('#team-members, #roles').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Banner />
      <Members />
      <Roles />
    </main>
  );
};

export default Team;
