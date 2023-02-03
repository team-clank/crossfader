import Footer from '../components/Footer';
import styles from './SSO.module.css';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { LogoOnclick } from '../components/Logo';

const SSO = ({
  setSignUpState,
}: {
  setSignUpState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <address className={styles.sso}>
      <div className={styles.body}>
        <nav className={styles.nav}>
          <img
            className={styles.logoIcon}
            alt=''
            src='../logo4.svg'
            onClick={LogoOnclick}
          />
          <WalletSelector />
        </nav>
        <div className={styles.contentscontainer}>
          <div className={styles.textcontainer}>
            <b className={styles.title}>Welcome. Stay safe.</b>
            <div className={styles.text}>
              <p className={styles.theEmailYou}>
                The email you enter will be used for
              </p>
              <p className={styles.strong2faSecurity}>strong 2FA security.</p>
            </div>
          </div>
          <div className={styles.btnText1}>
            <img className={styles.googleIcon} alt='' src='../google.svg' />
            <a
              className={styles.title}
              href='https://accounts.google.com/o/oauth2/auth?scope=email&client_id=612876662130-e10opej3r5l0dggntuigu7jjhoto382l.apps.googleusercontent.com&redirect_uri=http://localhost:3000/createAcc2&response_type=code'
            >
              Continue with Gmail
            </a>
          </div>
        </div>
        <Footer subtract='../subtract.svg' />
      </div>
    </address>
  );
};

export default SSO;
