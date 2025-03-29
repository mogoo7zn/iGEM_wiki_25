import React, { createContext, useState, useContext } from 'react';
import eventBus from '../utils/eventBus';

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [interactions, setInteractions] = useState({});

  // 记录组件交互
  const recordInteraction = (componentId, type, data = {}) => {
    const timestamp = Date.now();
    const newInteraction = {
      componentId,
      type,
      data,
      timestamp,
    };

    setInteractions((prev) => ({
      ...prev,
      [componentId]: [...(prev[componentId] || []), newInteraction],
    }));

    // 发布交互事件
    eventBus.emit('component:interaction', newInteraction);
  };

  // 设置当前活动的部分
  const setActive = (sectionId) => {
    if (sectionId !== activeSection) {
      setActiveSection(sectionId);
      eventBus.emit('section:active', { id: sectionId });
    }
  };

  return (
    <InteractionContext.Provider
      value={{
        activeSection,
        setActive,
        recordInteraction,
        interactions,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => useContext(InteractionContext);

export default InteractionContext;
