import { FunctionComponent } from "react";
import styles from "./NavigationBar.module.css";

type NavigationBarType = {
  logoImageUrl?: string;
};

const NavigationBar: FunctionComponent<NavigationBarType> = ({
  logoImageUrl,
}) => {
  return (
    <nav className={styles.nav}>
      <img className={styles.logoIcon} alt="" src={logoImageUrl} />
      <div className={styles.btnText} id="Address-container">
        <div className={styles.btnname}>0xfew...og2s</div>
      </div>
    </nav>
  );
};

export default NavigationBar;
