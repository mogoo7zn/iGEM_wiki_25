/**
 * 异步图片加载工具函数
 */
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * 检查元素是否在视口中
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * 防抖函数
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * 节流函数
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * 格式化日期
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * 平滑滚动到指定元素
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

/**
 * 检查移动设备
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * 创建并触发自定义事件
 */
export const triggerCustomEvent = (eventName, detail = {}) => {
  const event = new CustomEvent(eventName, { detail });
  document.dispatchEvent(event);
};

/**
 * 深拷贝对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (obj instanceof Object) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepClone(value)]));
  }
};

/**
 * 设置本地存储
 */
export const storage = {
  set: (key, value) => {
    try {
      // For primitive values like strings, wrap in quotes for proper JSON
      const valueToStore =
        typeof value === 'string'
          ? JSON.stringify(value) // Ensure strings are properly JSON encoded
          : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  },
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      // Handle case where item might be a raw string without JSON formatting
      if (!item) return defaultValue;

      try {
        return JSON.parse(item);
      } catch (parseError) {
        // If parsing fails, the value might be stored without quotes
        console.warn(`Error parsing item from localStorage: ${parseError}`);
        return item; // Return the raw string
      }
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return defaultValue;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }
  },
};

/**
 * 创建观察者
 */
export const createObserver = (callback, options = { threshold: 0.1 }) => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, options);
};

export default {
  loadImage,
  isInViewport,
  debounce,
  throttle,
  formatDate,
  scrollToElement,
  isMobile,
  triggerCustomEvent,
  deepClone,
  storage,
  createObserver,
};
