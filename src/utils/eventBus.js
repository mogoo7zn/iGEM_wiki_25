class EventBus {
  constructor() {
    this.events = {};
  }

  // 添加事件监听
  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.off(event, callback); // 返回取消订阅函数
  }

  // 添加一次性事件监听
  once(event, callback) {
    const onceWrapper = (data) => {
      callback(data);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  // 移除事件监听
  off(event, callback) {
    if (!this.events[event]) return;
    if (callback) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    } else {
      delete this.events[event];
    }
  }

  // 触发事件
  emit(event, data) {
    if (!this.events[event]) {
      console.warn(`No handlers for event: ${event}`);
      return;
    }
    this.events[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  clear(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
}

export default new EventBus();
