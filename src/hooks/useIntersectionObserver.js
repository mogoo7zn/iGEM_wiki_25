import { useEffect, useRef } from 'react';

/**
 * A custom React hook that implements the Intersection Observer API to monitor element visibility.
 *
 * @param {Object} options - The configuration options for the intersection observer
 * @param {HTMLElement|HTMLElement[]} options.target - The DOM element(s) to observe
 * @param {Function} options.onIntersect - Callback function that executes when target intersects
 * @param {number} [options.threshold=0.1] - A number or array of numbers between 0.0 and 1.0 indicating intersection ratio thresholds
 * @param {string} [options.rootMargin='0px'] - Margin around the root similar to CSS margin syntax
 * @returns {IntersectionObserver|null} The IntersectionObserver instance or null
 *
 * @example
 * const elementRef = useRef(null);
 * useIntersectionObserver({
 *   target: elementRef.current,
 *   onIntersect: (element) => {
 *     console.log('Element is visible!');
 *   },
 *   threshold: 0.5,
 *   rootMargin: '10px'
 * });
 */
const useIntersectionObserver = ({ target, onIntersect, threshold = 0.1, rootMargin = '0px' }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observerRef.current = observer;

    // Handle both single element and array of elements
    const targets = Array.isArray(target) ? target : [target];
    targets.forEach((el) => el && observer.observe(el));

    return () => {
      targets.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, [target, threshold, rootMargin, onIntersect]);

  return observerRef.current;
};

export default useIntersectionObserver;
