import { FunctionComponent } from "react";
import styles from "./BackgroundContainer.module.css";

const BackgroundContainer: FunctionComponent = () => {
  return (
    <div className={styles.contentscontainer}>
      <div className={styles.textcontainer}>
        <b className={styles.title}>
          <p className={styles.subscribe}>Subscribe</p>
          <p className={styles.theSecurityAlert}>the security alert</p>
        </b>
        <div className={styles.text}>
          <p className={styles.subscribe}>
            <span className={styles.weWillInform}>{`We will inform `}</span>
            <span
              className={styles.emailgmailcom}
            >{`{{email@gmail.com}}`}</span>
            <span> not only</span>
          </p>
          <p className={styles.theSecurityAlert}>
            <span>the security alert but also the news from Clank.</span>
          </p>
        </div>
      </div>
      <div className={styles.checkboxcontainer}>
        <div className={styles.checkbox}>
          <div className={styles.checkbox1} />
          <img className={styles.vectorIcon} alt="" src="../vector.svg" />
        </div>
        <div className={styles.text1}>
          I have read and understand the privacy and cookies policy and agree to
          receive personalized communications from Clank by Email
        </div>
      </div>
      <div className={styles.buttoncontainer}>
        <div className={styles.btnText}>
          <div className={styles.btnname}>Let me know</div>
        </div>
        <div className={styles.btnText1}>
          <div className={styles.btnnamet}>Later</div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundContainer;
