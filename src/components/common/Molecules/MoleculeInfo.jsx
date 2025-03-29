import { useMolecule } from '../../hooks/useMolecule';
import styles from './molecules.module.scss';

const MoleculeInfo = ({ smiles, showTopology = false }) => {
  const { molecule, indices } = useMolecule(smiles, { calculateIndices: showTopology });

  if (!molecule) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.moleculeInfo}>
      <h3>Molecular Information</h3>
      <div className={styles.infoGrid}>
        <div>Formula:</div>
        <div dangerouslySetInnerHTML={{ __html: molecule.formulaHtml }} />

        <div>Molecular Weight:</div>
        <div>{molecule.mass.toFixed(2)} g/mol</div>

        {showTopology && indices && (
          <>
            <div>Wiener Index:</div>
            <div>{indices.wiener.toFixed(3)}</div>

            <div>Randic Index:</div>
            <div>{indices.randic.toFixed(3)}</div>

            <div>Balaban Index:</div>
            <div>{indices.balaban.toFixed(3)}</div>

            <div>Harary Index:</div>
            <div>{indices.harary.toFixed(3)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoleculeInfo;
