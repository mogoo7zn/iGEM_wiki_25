import { useState, useEffect } from 'react';
import { parseMolecule } from '../utils/moleculeUtils';

/**
 * Hook to load molecule data from SMILES strings
 *
 * @param {Array} moleculeConfigs - Array of molecule configurations with SMILES strings
 * @returns {Object} - Molecule data, loading state, and error
 */
export const useMoleculeViewer = (moleculeConfigs = []) => {
  const [molecule, setMolecule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!moleculeConfigs || moleculeConfigs.length === 0) {
      setIsLoading(false);
      setError('No molecule configurations provided');
      return;
    }

    // Pick the first valid molecule configuration
    const config = moleculeConfigs.find((m) => m?.smiles) || moleculeConfigs[0];

    if (!config || !config.smiles) {
      setIsLoading(false);
      setError('Invalid SMILES string');
      return;
    }

    setIsLoading(true);
    setError(null);

    const loadMolecule = async () => {
      try {
        // Parse the SMILES string
        const parsedMolecule = parseMolecule(config.smiles);

        if (!parsedMolecule) {
          throw new Error(`Failed to parse SMILES: ${config.smiles}`);
        }

        // Override name if provided
        if (config.name) {
          parsedMolecule.name = config.name;
        }

        // Add SMILES to properties
        if (!parsedMolecule.properties) {
          parsedMolecule.properties = {};
        }
        parsedMolecule.properties.smiles = config.smiles;

        setMolecule(parsedMolecule);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading molecule:', err);
        setError(`Failed to load molecule: ${err.message}`);
        setIsLoading(false);
      }
    };

    loadMolecule();

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, [moleculeConfigs]);

  return { molecule, isLoading, error };
};

export default useMoleculeViewer;
