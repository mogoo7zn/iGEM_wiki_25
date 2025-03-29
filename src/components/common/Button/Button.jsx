import React from 'react';
import styles from './Button.module.scss';

/**
 * A reusable button component with customizable variants and sizes.
 *
 * @param {React.ReactNode} children - The content to display within the button.
 * @param {string} [variant='primary'] - The visual variant of the button (e.g., 'primary', 'secondary').  Corresponds to a style in Button.module.scss.
 * @param {string} [size='medium'] - The size of the button (e.g., 'small', 'medium', 'large'). Corresponds to a style in Button.module.scss.
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {string} [type='button'] - The type of the button (e.g., 'button', 'submit', 'reset').
 * @param {string} [className=''] - Additional CSS class names to apply to the button.
 * @param {object} props - Any other props to pass to the button element.
 *
 * @returns {React.JSX.Element} A button element.
 *
 * @example
 * <Button variant="secondary" size="small" onClick={handleClick}>
 *  Click me
 * </Button>
 *
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const variantClass = styles[variant] || '';
  const sizeClass = styles[size] || '';

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
