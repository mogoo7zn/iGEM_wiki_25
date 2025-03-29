import { useState, useEffect } from 'react';

/**
 * A custom hook that implements progressive image loading.
 * It displays a low-quality image initially and then transitions to a high-quality image once it's loaded.
 *
 * @param {string} lowQualitySrc - The URL of the low-quality image. This will be displayed initially.
 * @param {string} highQualitySrc - The URL of the high-quality image. This will replace the low-quality image once loaded.
 * @returns {[string, {blur: boolean, isLoaded: boolean}]} An array containing:
 *   - The current image source URL (either low-quality or high-quality).
 *   - An object with:
 *     - `blur`: A boolean indicating whether the low-quality image is currently displayed and should be blurred.
 *     - `isLoaded`: A boolean indicating whether the high-quality image has been loaded and is currently displayed.
 *
 * @example
 * // Usage in a component:
 * const [src, { blur, isLoaded }] = useProgressiveImg(lowResImage, highResImage);
 *
 * return (
 *   <img
 *     src={src}
 *     style={{
 *       filter: blur ? 'blur(20px)' : 'none',
 *       transition: 'filter 0.3s ease-in-out',
 *     }}
 *     alt="Progressive Image"
 *   />
 * );
 */
export const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc || highQualitySrc);

  useEffect(() => {
    // 如果没有低质量图，直接显示高质量图
    if (!lowQualitySrc) {
      setSrc(highQualitySrc);
      return;
    }

    setSrc(lowQualitySrc);

    // 预加载高质量图
    const img = new Image();
    img.src = highQualitySrc;

    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);

  // 返回当前src和状态信息
  return [
    src,
    {
      blur: src === lowQualitySrc && lowQualitySrc !== highQualitySrc,
      isLoaded: src === highQualitySrc,
    },
  ];
};

export default useProgressiveImg;
