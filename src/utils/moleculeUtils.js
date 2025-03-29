import { load, save, topology } from '../lib/molecules/molecules';

const moleculeCache = new Map();
const CACHE_SIZE_LIMIT = 50;
const cachePriority = [];
const d3Cache = new Map();

/**
 * Format molecular formula with HTML subscripts
 * Example: {C: 2, H: 6, O: 1} -> "C<sub>2</sub>H<sub>6</sub>O"
 */
export function formatMolecularFormula(formula) {
  if (!formula || typeof formula !== 'object') return '';

  let result = '';

  // Order: C, H, then others alphabetically
  const elements = Object.keys(formula).sort((a, b) => {
    if (a === 'C') return -1;
    if (b === 'C') return 1;
    if (a === 'H') return -1;
    if (b === 'H') return 1;
    return a.localeCompare(b);
  });

  elements.forEach((element) => {
    const count = formula[element];
    result += element;
    if (count > 1) {
      result += `<sub>${count}</sub>`;
    }
  });

  return result;
}

/**
 * Calculate all topological indices for a molecule
 */
export function calculateIndices(molecule) {
  try {
    if (!molecule || !molecule.atoms || !molecule.bonds) {
      return {
        wiener: 0,
        hyperwiener: 0,
        harary: 0,
        balaban: 0,
        randic: 0,
      };
    }

    // Create adjacency matrix
    const adjacencyMatrix = topology.matrix.adjacency(molecule);

    // Create distance matrix
    const distanceMatrix = topology.matrix.distance(adjacencyMatrix);

    // Calculate indices
    return {
      wiener: topology.index.wiener(distanceMatrix),
      hyperwiener: topology.index.hyperwiener(distanceMatrix),
      randic: topology.index.randic(adjacencyMatrix),
      // Add others as needed
    };
  } catch (error) {
    console.error('Error calculating indices:', error);
    return {
      wiener: 0,
      hyperwiener: 0,
      harary: 0,
      balaban: 0,
      randic: 0,
    };
  }
}

/**
 * Parse SMILES string and return molecule object
 */
export function parseMolecule(smiles) {
  // Check cache first
  if (moleculeCache.has(smiles)) {
    const index = cachePriority.indexOf(smiles);
    if (index > -1) {
      cachePriority.splice(index, 1);
    }
    cachePriority.push(smiles);
    return moleculeCache.get(smiles);
  }

  try {
    // Use the proper molecules.js API to parse SMILES
    const molecule = load.smiles(smiles);

    // Validate molecule structure
    if (!molecule || !molecule.atoms || Object.keys(molecule.atoms).length === 0) {
      console.warn(`Invalid molecule structure for SMILES: ${smiles}`);
      return null;
    }

    // Log detailed molecule structure for debugging
    console.log(`Parsed ${smiles}:`, {
      name: molecule.name,
      atomCount: Object.keys(molecule.atoms).length,
      bondCount: Object.keys(molecule.bonds || {}).length,
      atoms: Object.keys(molecule.atoms)
        .map((id) => `${id}:${molecule.atoms[id].element}`)
        .join(', '),
      bonds: Object.keys(molecule.bonds || {})
        .map((id) => {
          const bond = molecule.bonds[id];
          return `${bond.source || bond.from || bond.atoms[0]}-${bond.target || bond.to || bond.atoms[1]}(${bond.order || bond.type || 1})`;
        })
        .join(', '),
    });

    // Add formatted formula
    molecule.formulaHtml = formatMolecularFormula(molecule.properties?.formula);

    // Manage cache
    if (moleculeCache.size >= CACHE_SIZE_LIMIT) {
      const oldest = cachePriority.shift();
      moleculeCache.delete(oldest);
    }

    moleculeCache.set(smiles, molecule);
    cachePriority.push(smiles);

    return molecule;
  } catch (error) {
    console.error(`Error parsing SMILES: ${smiles}`, error);
    return null;
  }
}

/**
 * Convert molecule to D3 compatible format
 */
export function moleculeToD3(molecule) {
  try {
    // Deep clone the molecule to avoid modifying original
    const clonedMolecule = JSON.parse(JSON.stringify(molecule));

    // Create nodes from atoms
    const nodes = Object.keys(clonedMolecule.atoms).map((key) => {
      const atom = clonedMolecule.atoms[key];
      return {
        id: atom.id,
        name: atom.name || atom.element,
        element: atom.element,
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        properties: atom.properties,
      };
    });

    // Create links from bonds
    const links = [];

    Object.keys(clonedMolecule.bonds || {}).forEach((key) => {
      const bond = clonedMolecule.bonds[key];

      // Try different bond formats
      if (bond.atoms && bond.atoms.length >= 2) {
        links.push({
          source: bond.atoms[0], // Source atom ID
          target: bond.atoms[1], // Target atom ID
          bond: bond.order || 1, // Bond order (single, double, etc.)
        });
      } else if (bond.source && bond.target) {
        links.push({
          source: bond.source, // Source atom ID
          target: bond.target, // Target atom ID
          bond: bond.order || 1, // Bond order (single, double, etc.)
        });
      } else if (bond.from && bond.to) {
        links.push({
          source: bond.from, // Source atom ID
          target: bond.to, // Target atom ID
          bond: bond.order || 1, // Bond order (single, double, etc.)
        });
      }
    });

    return { nodes, links };
  } catch (error) {
    console.error('Error converting molecule to D3 format:', error);
    return { nodes: [], links: [] };
  }
}
