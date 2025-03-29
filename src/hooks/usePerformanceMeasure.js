import { useEffect, useRef } from 'react';
import { mark, measure } from '../utils/performance';

/**
 * Hook to easily measure component performance
 * @param {string} componentName - Name prefix for the performance marks
 * @param {boolean} enabled - Whether to enable performance measurement
 * @returns {Object} - Performance measurement utility functions
 */
export const usePerformanceMeasure = (componentName, enabled = true) => {
  const marksRef = useRef({});

  // Start measurement on mount, end on unmount
  useEffect(() => {
    if (!enabled) return;

    marksRef.current.componentStart = mark(`${componentName}-start`);

    return () => {
      if (marksRef.current.componentStart) {
        const endMark = mark(`${componentName}-end`);
        measure(`${componentName}-total-time`, marksRef.current.componentStart, endMark);
      }
    };
  }, [componentName, enabled]);

  // Functions to measure specific operations
  const measureOperation = (operationName, fn) => {
    if (!enabled) return fn();

    const startMark = mark(`${componentName}-${operationName}-start`);
    try {
      const result = fn();
      const endMark = mark(`${componentName}-${operationName}-end`);
      measure(`${componentName}-${operationName}-time`, startMark, endMark);
      return result;
    } catch (error) {
      const endMark = mark(`${componentName}-${operationName}-error`);
      measure(`${componentName}-${operationName}-error-time`, startMark, endMark);
      throw error;
    }
  };

  // Create a mark for an operation
  const markOperation = (operationName) => {
    if (!enabled) return null;

    const markName = `${componentName}-${operationName}`;
    const markId = mark(markName);
    marksRef.current[operationName] = markId;
    return markId;
  };

  // End measurement for a previously marked operation
  const endOperation = (operationName) => {
    if (!enabled || !marksRef.current[operationName]) return;

    const endMark = mark(`${componentName}-${operationName}-end`);
    measure(`${componentName}-${operationName}-time`, marksRef.current[operationName], endMark);

    // Remove the mark to prevent reuse
    delete marksRef.current[operationName];
  };

  return {
    measureOperation,
    markOperation,
    endOperation,
  };
};
