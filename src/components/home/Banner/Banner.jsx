import React, { Suspense, useCallback, useRef, useEffect, useMemo } from 'react';
import { lazy } from 'react';
import BaseBanner from '../../common/BaseBanner/BaseBanner';
import { useMoleculeViewer } from '../../../hooks/useMoleculeViewer';
import styles from './Banner.module.scss';

// Lazy load the MoleculeViewer
const MoleculeViewer = lazy(() => import('../../common/Molecules/MoleculeViewer'));

const Banner = () => {
  const moleculeContainerRef = useRef(null);

  // Add ref to track if component is mounted
  const isMountedRef = useRef(false);

  // Simply change the SMILES here to display a different molecule
  const { molecule, isLoading, error } = useMoleculeViewer([
    // Uncomment any of these to display different molecules:
    // { smiles: 'C1=CC=CC=C1', name: 'Benzene' },
    // { smiles: 'C1CCCCC1=C1CC1', name: 'Bicyclic Compound' },
    { smiles: 'CC1(C(N2C(S1)C(C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C', name: 'Penicillin' },
    // { smiles: 'CC1C(C(CC(O1)OC2C(C(C(OC2OC3=C4C=C5C=C3OC6=C(C=C(C=C6)[C@H](C(C(=O)NC([C@@H](C5=O)NC(=O)[C@@H]([C@H](C7=CC(=C(O7)C4=O)Cl)O)CC8=CC=C(C=C8)O)CO)O)NC(=O)[C@H](CC9=CC=C(C=C9)O)NC(=O)C1C(C(CC(O1)NC(=O)[C@H](CC1=CC=C(C=C1)O)NC)O)O)O)Cl)CO)O)O)NC(=O)C', name: 'Vancomycin' },
    // { smiles: 'CCCC', name: 'Butane' },
    // { smiles: 'CC(=O)O', name: 'Acetic Acid' },
    { smiles: 'C1CCOC1', name: 'Tetrahydrofuran' },
    { smiles: 'CN1C=NC2=C1C(=O)N(C)C(=O)N2C', name: 'Caffeine' },
  ]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 使用useEffect阻止分子容器上的滚轮事件冒泡
  useEffect(() => {
    const container = moleculeContainerRef.current;
    if (!container) return;

    const preventWheelPropagation = (e) => {
      // 阻止事件冒泡，避免触发父组件的重新渲染
      e.stopPropagation();
      // Also prevent default to avoid scrolling
      e.preventDefault();
    };

    container.addEventListener('wheel', preventWheelPropagation, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventWheelPropagation);
    };
  }, []);

  // 分子选项，使用useMemo避免不必要的重新创建
  const moleculeOptions = useMemo(
    () => ({
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
      bondScaleFactor: 4.4,
      atomRadiusMultiplier: 3.9,
      enableLabels: false,
      enableShadows: true,
      enable3DEffect: true,
      scaleFactor: 0.85,
      viewportPadding: 40,
      simulationIterations: 500,
      bondDistance: 9,
      showHydrogens: true,
      useEnhancedColors: true,
    }),
    []
  );

  return (
    <BaseBanner id="banner" className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.bannerContent}>
          <div className={styles.textContent}>
            <h1 className={styles.h1}>iGEM Team 2025</h1>
            <p className={styles.description}>Synthetic Biology Innovation</p>
            <ul className={styles.actions}>
              <li>
                <a href="#one" className={styles.button}>
                  Get Started
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.moleculeContainer} ref={moleculeContainerRef}>
            {isLoading ? (
              <div className={styles.loadingMolecule}>Loading molecule...</div>
            ) : error ? (
              <div className={styles.moleculeError}>{error}</div>
            ) : molecule ? (
              <Suspense fallback={<div className={styles.loadingMolecule}>Loading viewer...</div>}>
                <MoleculeViewer
                  molecule={molecule}
                  className={styles.moleculeViewer}
                  options={moleculeOptions}
                  key={`molecule-${molecule.name}`} // Add key to ensure proper remounting
                />
              </Suspense>
            ) : (
              <div className={styles.noMolecule}>No molecule available</div>
            )}
          </div>
        </div>
      </div>
    </BaseBanner>
  );
};

// Export as memoized component to prevent unnecessary rerenders
export default React.memo(Banner);
