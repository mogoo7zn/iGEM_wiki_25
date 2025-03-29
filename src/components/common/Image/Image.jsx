import React from 'react';
import { useProgressiveImg } from '../../../hooks/useProgressiveImg';
import styles from './Image.module.scss';

/**
 * A progressive image component that displays a low-resolution placeholder image while the high-resolution image loads.
 *
 * @param {string} src - The URL of the high-resolution image.
 * @param {string} alt - The alt text for the image.
 * @param {string} [placeholderSrc=''] - The URL of the low-resolution placeholder image. Defaults to an empty string.
 * @param {string} [className=''] - Additional CSS classes to apply to the image. Defaults to an empty string.
 * @param {number} [width] - The width of the image.
 * @param {number} [height] - The height of the image.
 * @param {string} [loading='lazy'] - Specifies how the browser should load the image.  Can be 'lazy', 'eager', or 'auto'. Defaults to 'lazy'.
 * @param {object} props - Any other props to pass to the `img` element.
 * @returns {React.Element} A React element that renders an image with progressive loading.
 *
 * @example
 * // Basic usage:
 * <Image src="image.jpg" alt="My Image" />
 *
 * @example
 * // With a placeholder image:
 * <Image src="image.jpg" alt="My Image" placeholderSrc="image-placeholder.jpg" />
 *
 * @example
 * // With custom width and height:
 * <Image src="image.jpg" alt="My Image" width={500} height={300} />
 *
 * @example
 * // With custom CSS class:
 * <Image src="image.jpg" alt="My Image" className="my-custom-class" />
 */
const Image = ({
  src,
  alt,
  placeholderSrc = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  ...props
}) => {
  const [imgSrc, { blur }] = useProgressiveImg(placeholderSrc, src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${styles.image} ${blur ? styles.loading : styles.loaded} ${className}`}
      width={width}
      height={height}
      loading={loading}
      {...props}
    />
  );
};

export default Image;
