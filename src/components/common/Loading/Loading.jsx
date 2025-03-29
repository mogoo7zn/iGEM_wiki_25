import React from 'react';
import styles from './Loading.module.scss'; // 修改导入路径

/**
 * @component Loading
 * @description A reusable loading spinner component with customizable size, color, and display style.
 *
 * @param {string} [size='medium'] - The size of the loading spinner. Options: 'small', 'medium', 'large'.
 * @param {string} [color='primary'] - The color of the loading spinner. Options: 'primary', 'secondary', etc. (defined in SCSS).
 * @param {boolean} [inline=false] - Whether the loading spinner should be displayed inline.
 *
 * @example
 * // Basic usage:
 * <Loading />
 *
 * @example
 * // Custom size and color:
 * <Loading size="large" color="secondary" />
 *
 * @example
 * // Inline display:
 * <Loading inline />
 */
const Loading = ({ size = 'medium', color = 'primary', inline = false }) => {
  const sizeClass = styles[`loading-spinner-${size}`] || '';
  const colorClass = styles[`loading-spinner-${color}`] || '';

  return (
    <div className={`${styles['loading']} ${inline ? styles['inline'] : ''}`}>
      <div className={`${styles['loading-spinner']} ${sizeClass} ${colorClass}`}></div>
    </div>
  );
};

export default Loading;
