import { FunctionComponent } from 'react';
import VaultHeaderContainer from '../components/VaultHeaderContainer';
import Footer from '../components/Footer';
import styles from './SkeletonOption.module.css';

const SkeletonOption = () => {
  return (
    <div className={styles.skeletonoption}>
      <div className={styles.body}>
        <VaultHeaderContainer logo='../logo4.svg' />
        <div className={styles.frameParent} id='Loading-container'>
          <div
            className={styles.groupChild}
            id='Loading-deposit-token-container'
          />
          <div className={styles.groupItem} id='loading-activities-container' />
        </div>
        <Footer subtract='../subtract.svg' />
      </div>
    </div>
  );
};

export default SkeletonOption;
