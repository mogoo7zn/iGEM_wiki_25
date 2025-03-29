import React, { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';

/**
 * @description A component that provides a button to scroll back to the top of the page.
 *
 * @example
 * // Usage:
 * <ScrollToTop />
 *
 * @returns {JSX.Element|null} A button that appears when the user scrolls down the page, allowing them to smoothly scroll back to the top. Returns null if the button is not visible.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件，决定按钮是否可见
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过300px时显示按钮
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // 初始检查
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 滚动到页面顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button onClick={scrollToTop} className={styles.scrollToTop} aria-label="Scroll to top">
        <span className={styles.arrow}>↑</span>
      </button>
    )
  );
};

export default ScrollToTop;
