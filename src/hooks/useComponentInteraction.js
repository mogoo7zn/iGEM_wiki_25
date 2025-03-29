import { useState, useEffect } from 'react';
import eventBus from '../utils/eventBus';

/**
 * A custom hook for managing component interactions through an event bus system.
 *
 * @param {string} componentId - Unique identifier for the component
 * @param {Object} initialState - Initial state for the interaction (default: {})
 * @returns {[Object, Function]} A tuple containing:
 *  - interactionState: Current state of interactions
 *  - emitInteraction: Function to emit new interactions
 *
 * @example
 * const [state, emit] = useComponentInteraction('myComponent', { active: false });
 *
 * // Emit an interaction
 * emit('click', { target: 'otherComponent', data: someData });
 *
 * // Receive interactions in state when other components emit to this componentId
 * console.log(state);
 */
export const useComponentInteraction = (componentId, initialState = {}) => {
  const [interactionState, setInteractionState] = useState(initialState);

  useEffect(() => {
    const handleInteraction = (data) => {
      if (data.target === componentId || data.target === 'all') {
        setInteractionState((prev) => ({ ...prev, ...data }));
      }
    };

    eventBus.on('componentInteraction', handleInteraction);

    return () => {
      eventBus.off('componentInteraction', handleInteraction);
    };
  }, [componentId]);

  const emitInteraction = (action, data = {}) => {
    eventBus.emit('componentInteraction', {
      source: componentId,
      action,
      ...data,
    });
  };

  return [interactionState, emitInteraction];
};
