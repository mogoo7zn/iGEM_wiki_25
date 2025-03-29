/**
 * Performance measurement utilities for React components
 */

// Store performance measurements
const performanceStore = {
  measures: {},
  marks: {},
};

/**
 * Checks if the Performance API is available
 */
export const isPerformanceSupported = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.performance !== 'undefined' &&
    typeof window.performance.mark === 'function'
  );
};

/**
 * Creates a performance mark with a unique name
 * @param {string} name - Base name for the mark
 * @returns {string} Generated unique mark name
 */
export const mark = (name) => {
  if (!isPerformanceSupported()) return null;

  const markName = `${name}_${Date.now()}`;
  try {
    window.performance.mark(markName);
    performanceStore.marks[markName] = true;
    return markName;
  } catch (error) {
    console.error('Error creating performance mark:', error);
    return null;
  }
};

/**
 * Measures performance between two marks or from mark to now
 * @param {string} name - Name for the measurement
 * @param {string} startMark - Start mark name
 * @param {string} [endMark] - Optional end mark name, measures to now if not provided
 * @returns {number|null} Duration in milliseconds or null if measurement failed
 */
export const measure = (name, startMark, endMark = null) => {
  if (!isPerformanceSupported() || !startMark) return null;

  try {
    let duration;
    if (endMark) {
      // Measure between two marks
      const measure = window.performance.measure(name, startMark, endMark);
      duration = measure.duration;
    } else {
      // Measure from mark to now
      const endMarkName = `${name}_end_${Date.now()}`;
      window.performance.mark(endMarkName);
      const measure = window.performance.measure(name, startMark, endMarkName);
      duration = measure.duration;
      window.performance.clearMarks(endMarkName);
    }

    // Store the measurement
    performanceStore.measures[name] = duration;

    // Clean up marks
    window.performance.clearMarks(startMark);
    if (endMark) window.performance.clearMarks(endMark);

    // Clear measure to avoid memory leaks
    window.performance.clearMeasures(name);

    return duration;
  } catch (error) {
    console.error('Error measuring performance:', error);
    return null;
  }
};

/**
 * Measures the performance of a function
 * @param {Function} fn - Function to measure
 * @param {string} [name] - Optional name for the measurement
 * @returns {any} Result of the function
 */
export const measurePerformance = (fn, name = 'performance_measure') => {
  if (typeof fn !== 'function') {
    console.error('measurePerformance requires a function as first parameter');
    return null;
  }

  const startMark = mark(name);
  try {
    const result = fn();
    measure(name, startMark);
    return result;
  } catch (error) {
    measure(name, startMark);
    throw error;
  }
};

/**
 * Gets all performance measurements
 * @returns {Object} All stored measurements
 */
export const getAllMeasurements = () => {
  return { ...performanceStore.measures };
};

/**
 * Clears all performance marks and measures
 */
export const clearPerformance = () => {
  if (!isPerformanceSupported()) return;

  try {
    // Clear all performance marks
    window.performance.clearMarks();

    // Clear all performance measures
    window.performance.clearMeasures();

    // Reset our store
    performanceStore.marks = {};
    performanceStore.measures = {};
  } catch (error) {
    console.error('Error clearing performance data:', error);
  }
};

// Add this function after the measure() function
/**
 * Measures duration between two performance marks
 * @param {string} startMark - Start mark name
 * @param {string} endMark - End mark name
 * @param {string} name - Name for the measurement
 * @returns {number|null} Duration in milliseconds or null if measurement failed
 */
export const measureDuration = (startMark, endMark, name) => {
  if (!isPerformanceSupported() || !startMark || !endMark) return null;

  try {
    // Measure between the two marks
    const measurement = window.performance.measure(name, startMark, endMark);
    const duration = measurement.duration;

    // Store the measurement
    performanceStore.measures[name] = duration;

    // Log the measurement
    console.log(`${name}: ${duration.toFixed(2)}ms`);

    // Clean up marks
    window.performance.clearMarks(startMark);
    window.performance.clearMarks(endMark);

    // Clear measure to avoid memory leaks
    window.performance.clearMeasures(name);

    return duration;
  } catch (error) {
    console.error('Error measuring duration:', error);
    return null;
  }
};

/**
 * Reports all performance measurements to console
 */
export const reportPerformance = () => {
  console.group('Performance Measurements:');
  Object.entries(performanceStore.measures).forEach(([name, duration]) => {
    console.log(`${name}: ${duration.toFixed(2)}ms`);
  });
  console.groupEnd();

  // Clear stored measurements to prevent memory leaks
  Object.keys(performanceStore.marks).forEach((markName) => {
    try {
      window.performance.clearMarks(markName);
    } catch (e) {
      // Ignore errors for marks that might already be cleared
    }
  });

  performanceStore.marks = {};
  performanceStore.measures = {};
};
