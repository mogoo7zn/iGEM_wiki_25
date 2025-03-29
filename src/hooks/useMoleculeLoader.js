import { useState, useEffect } from 'react';

export function useMoleculeLoader() {
  const [molecules, setMolecules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMolecules = async (source) => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (typeof source === 'string' && source.startsWith('http')) {
        // Load from URL
        const response = await fetch(source);
        data = await response.json();
      } else if (Array.isArray(source)) {
        // Direct array of molecules
        data = source;
      } else {
        throw new Error('Invalid source format');
      }

      setMolecules(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading molecules:', err);
    } finally {
      setLoading(false);
    }
  };

  return { molecules, loading, error, loadMolecules };
}
