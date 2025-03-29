import React, { useEffect } from 'react';
import styles from './Banner.module.scss';
import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';

const Banner = () => {
  useIsomorphicLayoutEffect(() => {
    const updateBannerPosition = () => {
      const header = document.querySelector('header');
      if (!header) return;

      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--current-header-height', `${headerHeight}px`);
    };

    // 确保代码仅在客户端执行
    if (typeof window !== 'undefined') {
      // 初始调整
      updateBannerPosition();

      // 创建ResizeObserver来监视header元素大小变化
      const header = document.querySelector('header');
      if (header) {
        const resizeObserver = new ResizeObserver(() => {
          updateBannerPosition();
        });

        resizeObserver.observe(header);
        return () => resizeObserver.disconnect();
      }
    }
  }, []);

  return (
    <section id="team-banner" className={styles.banner}>
      <div className={styles.inner}>
        <h1>Our Team</h1>
        <p className={styles.description}>Meet our sci-passionate individuals behind the project</p>
      </div>
    </section>
  );
};

export default Banner;
