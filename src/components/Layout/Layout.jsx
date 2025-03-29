import React, { useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { ScrollToTop } from '../common';
import { useTheme } from '../../context/ThemeContext';
import styles from './Layout.module.scss';
import eventBus from '../../utils/eventBus';
import { throttle } from '../../lib/utils';

/**
 * @component Layout
 * @description Provides a consistent layout structure for the application, including a header, main content area, footer, and scroll-to-top button.
 * It also manages theme application and emits scroll events for other components to react to.
 *
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to be rendered within the main area of the layout.
 *
 * @example
 * // Usage:
 * <Layout>
 *   <HomePageContent />
 * </Layout>
 *
 * @returns {JSX.Element} The Layout component.
 *
 * @dev
 * __note:this component can be actively modified during this stage, watch closely when using__
 * - Ensure that the header height is correctly calculated and applied to the document's root element for proper content spacing.
 * - The scroll event listener is throttled to improve performance. Adjust the throttle time (currently 100ms) as needed.
 * - Consider adding more robust error handling for cases where the header element is not found.
 */
const Layout = ({ children }) => {
  // 使用主题管理
  const { theme } = useTheme();

  useEffect(() => {
    // 初始设置header高度
    const setInitialHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight;
        /*document 代表整个HTML文档提供了访问和操作网页内容的方法和属性
         * document.documentElement 返回文档对象（document）的根元素
         */
        document.documentElement.style.setProperty('--current-header-height', `${headerHeight}px`);
      }
    };

    // 在组件挂载和窗口大小改变时设置header高度
    setInitialHeaderHeight();
    window.addEventListener('resize', setInitialHeaderHeight); // 事件：'resize' 处理函数：setInitialHeaderHeight

    // 在页面滚动时发送事件, throttle 节流优化
    const handleScroll = throttle(() => {
      eventBus.emit('page:scroll', {
        position: window.scrollY,
        direction: window.scrollY > (window._lastScrollY || 0) ? 'down' : 'up',
        timestamp: Date.now(),
      });
      window._lastScrollY = window.scrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 清理事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setInitialHeaderHeight);
    };
  }, []);

  // 布局渲染
  return (
    <div className={`${styles.layout} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
