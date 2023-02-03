import { FunctionComponent } from "react";
import NavigationBar from "../components/NavigationBar";
import AuthenticationContainer from "../components/AuthenticationContainer";
import styles from "./Request2FA.module.css";

const Request2FA: FunctionComponent = () => {
  return (
    <address className={styles.request2fa}>
      <div className={styles.body}>
        <NavigationBar logoImageUrl="../logo1.svg" />
        <AuthenticationContainer
          title="We’ve got your request"
          ifYouWantToContinueThisPr="If you want to continue this progress,"
          pleaseAuthenticateWithYou="please authenticate with your gmail account"
          google="../google.svg"
          btnName="Authenticate with Gmail"
        />
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
            <img className={styles.subtractIcon} alt="" src="../subtract.svg" />
            <img
              className={styles.image24Icon}
              alt=""
              src="../image-24@2x.png"
            />
          </div>
        </div>
      </div>
    </address>
  );
};

export default Request2FA;
