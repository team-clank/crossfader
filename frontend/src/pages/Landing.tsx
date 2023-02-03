import Footer from '../components/Footer';
import styles from './Landing.module.css';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { LogoOnclick } from '../components/Logo';

const Landing = () => {
  return (
    <main className={styles.landing} id='Landing-container'>
      <div className={styles.body}>
        <div className={styles.nav}>
          <img
            className={styles.logoIcon}
            alt=''
            src='../logo.svg'
            onClick={LogoOnclick}
          />
          <button className={styles.btncontainer} id='link-nav'>
            <div className={styles.btnText}>
              <b className={styles.btnnamet}>about</b>
            </div>
            <div className={styles.btnText}>
              <b className={styles.btnnamet}>docs</b>
            </div>
          </button>
        </div>
        <div className={styles.contentscontainer}>
          <div className={styles.textcontainer}>
            <div className={styles.title}>
              <p className={styles.aSolidSafe}>A solid safe for</p>
              <p className={styles.yourAssets}>your assets</p>
            </div>
            <div className={styles.description}>
              <p className={styles.aSolidSafe}>A powerful 2fa keeps all your</p>
              <p className={styles.yourAssets}>assets safe from threats.</p>
            </div>
          </div>
          <WalletSelector />
        </div>
        <Footer subtract='../subtract.svg' />
      </div>
    </main>
  );
};

export default Landing;
