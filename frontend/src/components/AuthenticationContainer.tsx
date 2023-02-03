import { FunctionComponent } from "react";
import styles from "./AuthenticationContainer.module.css";

type AuthenticationContainerType = {
  title?: string;
  ifYouWantToContinueThisPr?: string;
  pleaseAuthenticateWithYou?: string;
  google?: string;
  btnName?: string;
};

const AuthenticationContainer: FunctionComponent<
  AuthenticationContainerType
> = ({
  title,
  ifYouWantToContinueThisPr,
  pleaseAuthenticateWithYou,
  google,
  btnName,
}) => {
  return (
    <div className={styles.contentscontainer}>
      <div className={styles.textcontainer}>
        <b className={styles.title}>{title}</b>
        <div className={styles.text}>
          <p className={styles.ifYouWant}>{ifYouWantToContinueThisPr}</p>
          <p className={styles.pleaseAuthenticateWith}>
            {pleaseAuthenticateWithYou}
          </p>
        </div>
      </div>
      <div className={styles.btnText}>
        <img className={styles.googleIcon} alt="" src={google} />
        <b className={styles.title}>{btnName}</b>
      </div>
    </div>
  );
};

export default AuthenticationContainer;
