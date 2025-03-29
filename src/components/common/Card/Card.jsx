import React from 'react';
import styles from './Card.module.scss';

/**
 * Card component for displaying content in a card format.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the card.
 * @param {string} [title] - The title of the card.
 * @param {string} [className=''] - Additional CSS classes to apply to the card.
 * @param {boolean} [elevated=false] - Whether the card should have an elevated appearance.
 * @param {boolean} [interactive=false] - Whether the card should be interactive (clickable).
 * @param {function} [onClick] - The function to call when the card is clicked (only if interactive is true).
 * @param {object} [props] - Any other props to pass to the card's div element.
 *
 * @example
 * // Basic card
 * <Card>
 *   <p>Some content</p>
 * </Card>
 *
 * @example
 * // Card with a title
 * <Card title="My Card">
 *   <p>Some content</p>
 * </Card>
 *
 * @example
 * // Interactive card with a click handler
 * <Card title="Clickable Card" interactive onClick={() => alert('Card clicked!')}>
 *   <p>Click me!</p>
 * </Card>
 *
 * @returns {React.Element} A React element representing the card.
 */
const Card = ({
  children,
  title,
  className = '',
  elevated = false,
  interactive = false,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`
        ${styles.card} 
        ${elevated ? styles.elevated : ''} 
        ${interactive ? styles.interactive : ''}
        ${className}
      `}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
