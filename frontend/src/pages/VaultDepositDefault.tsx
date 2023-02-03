import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import NavContainer from "../components/NavContainer";
import DepositCard from "../components/DepositCard";
import Footer from "../components/Footer";
import styles from "./VaultDepositDefault.module.css";

const VaultDepositDefault: FunctionComponent = () => {
  return (
    <div className={styles.vaultDepositDefault} id="Vault-operation-container">
      <div className={styles.body}>
        <NavContainer logoImageUrl="../logo2.svg" />
        <div className={styles.contentscontainer}>
          <DepositCard />
          <div className={styles.btncontainer}>
            <Button variant="contained" color="primary">
              Deposit
            </Button>
            <Button variant="outlined" color="primary">
              Cancel
            </Button>
          </div>
        </div>
        <Footer subtract="../subtract2.svg" />
      </div>
    </div>
  );
};

export default VaultDepositDefault;
