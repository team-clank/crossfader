import { FunctionComponent } from 'react';
import styles from './NavContainer.module.css';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { LogoOnclick } from './Logo';

type NavContainerType = {
  logoImageUrl?: string;
};

const NavContainer: FunctionComponent<NavContainerType> = ({
  logoImageUrl,
}) => {
  return (
    <div className={styles.nav}>
      <img
        className={styles.logoIcon}
        alt=''
        src={logoImageUrl}
        onClick={LogoOnclick}
      />
      <WalletSelector />
    </div>
  );
};

export default NavContainer;
