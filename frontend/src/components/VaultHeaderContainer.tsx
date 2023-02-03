import { FunctionComponent } from 'react';
import styles from './VaultHeaderContainer.module.css';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { LogoOnclick } from './Logo';

type VaultHeaderContainerType = {
  logo?: string;
};

const VaultHeaderContainer: FunctionComponent<VaultHeaderContainerType> = ({
  logo,
}) => {
  return (
    <div className={styles.nav}>
      <img
        className={styles.logoIcon}
        alt=''
        src={logo}
        onClick={LogoOnclick}
      />
      <div className={styles.btncontainer}>
        <div className={styles.btnText}>
          <b className={styles.btnnamet}>Vault</b>
        </div>
        <div className={styles.btnText1}>
          <b className={styles.btnnamet}>Staking</b>
        </div>
      </div>
      <WalletSelector />
    </div>
  );
};

export default VaultHeaderContainer;
