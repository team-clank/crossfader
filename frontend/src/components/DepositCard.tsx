import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import styles from "./DepositCard.module.css";

const DepositCard: FunctionComponent = () => {
  return (
    <div className={styles.textcontainer}>
      <b className={styles.title}>How many tokens do you want to deposit?</b>
      <div className={styles.inputcontainer}>
        <input className={styles.input} type="number" placeholder="0" />
        <b className={styles.text}>APT</b>
      </div>
      <div className={styles.convcontainer}>
        <div
          className={styles.text1}
        >{`Still {{wallet_asset}} APT depositable`}</div>
        <div className={styles.percentcontainer}>
          <Button sx={{ width: 80 }} variant="outlined" color="primary">
            10%
          </Button>
          <Button sx={{ width: 80 }} variant="outlined" color="primary">
            25%
          </Button>
          <Button sx={{ width: 80 }} variant="outlined" color="primary">
            50%
          </Button>
          <Button sx={{ width: 80 }} variant="outlined" color="primary">
            100%
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DepositCard;
