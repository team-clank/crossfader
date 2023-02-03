import { FunctionComponent } from "react";
import styles from "./Footer.module.css";

type FooterType = {
  subtract?: string;
};

const Footer: FunctionComponent<FooterType> = ({ subtract }) => {
  return (
    <div className={styles.bottombuttoncontainer}>
      <div className={styles.privacycontainer}>
        <div className={styles.btnText}>
          <div className={styles.btnnamet}>Risk and Security</div>
        </div>
        <div className={styles.btnText}>
          <div className={styles.btnnamet}>Term and use</div>
        </div>
      </div>
      <div className={styles.socialbuttoncontainer}>
        <img className={styles.subtractIcon} alt="" src={subtract} />
        <img className={styles.image24Icon} alt="" src="../image-24@2x.png" />
      </div>
    </div>
  );
};

export default Footer;
