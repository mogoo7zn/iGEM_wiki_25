'use client';
import React from 'react';
import { useBannerPosition } from '../../../hooks/useBannerPosition';
import styles from './BaseBanner.module.scss';

/**
 * A base banner component that handles banner positioning using a custom hook.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.id - Unique identifier for the banner section
 * @param {string} [props.className] - Additional CSS class names to apply to the banner
 * @param {ReactNode} props.children - The content to be rendered inside the banner
 *
 * @example
 * // Basic usage
 * <BaseBanner id="myBanner">
 *   <h1>Banner Content</h1>
 * </BaseBanner>
 *
 * // With custom className
 * <BaseBanner id="myBanner" className="custom-banner">
 *   <h1>Banner Content</h1>
 * </BaseBanner>
 *
 * .customBanner {
 *   background-image: url('/path/to/image.jpg');
 *   color: white;
 *
 *   h1 {
 *     font-size: 3rem;
 *     margin-bottom: 1rem;
 *   }
 *
 *   p {
 *     font-size: 1.2rem;
 *   }
 * }
 *
 * @returns {JSX.Element} A banner section with positioned content
 */
const BaseBanner = ({ id, className, children }) => {
  /**使用封装的hook处理banner定位，并传入id以便直接操作
   * 1.动态计算和更新 banner 的位置和尺寸
   * 2.响应各种屏幕和设备变化
   * 3.处理与 header 的交互 */
  useBannerPosition(id);

  return (
    <section id={id} className={`${styles.baseBanner} ${className || ''}`}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
};

export default BaseBanner;
