import { useLayoutEffect, useEffect } from 'react';

// 检测是否在服务器环境
const isServer = typeof window === 'undefined';

/**
 * @file useIsomorphicLayoutEffect.js
 * @module useIsomorphicLayoutEffect
 */

/**
 * A hook that uses `useLayoutEffect` in the browser and `useEffect` on the server.
 * This is useful for avoiding the "useLayoutEffect does nothing on the server" warning.
 *
 * @function useIsomorphicLayoutEffect
 * @returns {function} - Returns `useEffect` if running on the server, otherwise returns `useLayoutEffect`.
 *
 * @example
 * // Usage:
 * import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
 *
 * function MyComponent() {
 *   useIsomorphicLayoutEffect(() => {
 *     // Perform side effects here.  This will run after the browser has painted,
 *     // so it's safe to perform DOM manipulations.  On the server, this will
 *     // run after the component has been rendered.
 *
 *     return () => {
 *       // Perform cleanup here.
 *     };
 *   }, []);
 *
 *   return (
 *     <div>
 *       Hello, world!
 *     </div>
 *   );
 * }
 */
const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;
// 在客户端使用useLayoutEffect，在服务端使用useEffect

export default useIsomorphicLayoutEffect;
