import { useEffect } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * @function useBannerPosition
 * @description A custom hook that dynamically adjusts the position and height of a banner element based on the header's height.
 * It uses `useIsomorphicLayoutEffect` to perform layout calculations and `useEffect` to handle window resize and scroll events.
 * @param {string} [bannerId] - The ID of the banner element to adjust. If provided, the hook will update the banner's `paddingTop` and `minHeight` styles.
 *                               If not provided, the hook will only update the `--current-header-height` CSS variable.
 *
 * @example
 * // In a component:
 * const MyComponent = () => {
 *   useBannerPosition('myBanner');
 *
 *   return (
 *     <>
 *       <header>...</header>
 *       <div id="myBanner">...</div>
 *     </>
 *   );
 * };
 *
 * @example
 * // In a component without a specific banner:
 * const MyComponent = () => {
 *   useBannerPosition();
 *
 *   return (
 *     <>
 *       <header>...</header>
 *       <div>...</div>
 *     </>
 *   );
 * };
 *
 * @remarks
 * - The hook relies on the presence of a `<header>` element in the DOM.
 * - It sets the `--current-header-height` CSS variable to the header's height, which can be used in CSS to position other elements.
 * - If a `bannerId` is provided, it updates the banner's `paddingTop` to match the header's height and sets the `minHeight` to fill the remaining viewport space.
 * - The hook listens for header resize, window resize, orientation change, and scroll events to keep the banner position updated.
 */
export const useBannerPosition = (bannerId) => {
  // 使用IsomorphicLayoutEffect处理布局计算
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const updateBannerPosition = () => {
      const header = document.querySelector('header');
      if (!header) return;

      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--current-header-height', `${headerHeight}px`);

      // 如果提供了具体bannerId，则更新该banner的样式
      if (bannerId) {
        const banner = document.getElementById(bannerId);
        if (banner) {
          banner.style.paddingTop = `${headerHeight}px`;
          banner.style.minHeight = `calc(100vh - ${headerHeight}px)`; // 填充剩余视口
        }
      }
    };

    // 初始调整
    updateBannerPosition();

    // 监视header元素大小变化
    const header = document.querySelector('header');
    if (header) {
      const resizeObserver = new ResizeObserver(updateBannerPosition);
      resizeObserver.observe(header);

      // 监听orientationchange事件，处理移动设备旋转
      window.addEventListener('orientationchange', updateBannerPosition);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('orientationchange', updateBannerPosition);
      };
    }
  }, [bannerId]);

  // 额外监听窗口resize事件和滚动事件
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleViewportChange = () => {
      const header = document.querySelector('header');
      if (!header) return;

      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--current-header-height', `${headerHeight}px`);

      // 如果提供了具体bannerId，则更新该banner的样式
      if (bannerId) {
        const banner = document.getElementById(bannerId);
        if (banner) {
          banner.style.paddingTop = `${headerHeight}px`;
          banner.style.minHeight = `calc(100vh - ${headerHeight}px)`;
        }
      }
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange);
    };
  }, [bannerId]);
};
