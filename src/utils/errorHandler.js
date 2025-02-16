const globalErrorHandler = (error) => {
  console.error('Global error:', error);
  // 可以添加错误上报逻辑
};

window.onerror = (message, source, lineno, colno, error) => {
  globalErrorHandler(error);
  return false;
};

window.addEventListener('unhandledrejection', (event) => {
  globalErrorHandler(event.reason);
});

export { globalErrorHandler };
