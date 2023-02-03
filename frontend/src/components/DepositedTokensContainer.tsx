import { FunctionComponent } from 'react';
import { Button } from '@mui/material';
import styles from './DepositedTokensContainer.module.css';

const DepositedTokensContainer = ({
  depositedAPT,
}: {
  depositedAPT: number;
}) => {
  const depositValue = 18.33 * depositedAPT;
  return (
    <div className={styles.vaultcontainer} id='Deposit-tokens-container'>
      <div className={styles.vaultheader}>
        <b className={styles.depositedTokens}>Deposited tokens</b>
        <div className={styles.kebabbutton}>
          <img
            className={styles.kebabbuttonChild}
            alt=''
            src='../ellipse-3.svg'
          />
          <img
            className={styles.kebabbuttonChild}
            alt=''
            src='../ellipse-3.svg'
          />
          <img
            className={styles.kebabbuttonChild}
            alt=''
            src='../ellipse-3.svg'
          />
        </div>
      </div>
      <div className={styles.itemcontainer}>
        <div className={styles.assetcontainer}>
          <b className={styles.depositedTokens}>{depositedAPT}</b>
          <div className={styles.estvalue}>~${depositValue}</div>
        </div>
        <div className={styles.aptoscontainer}>
          <img
            className={styles.aptosSymbolIcon}
            alt=''
            src='../aptos-symbol.svg'
          />
          <b className={styles.depositedTokens}>APT</b>
        </div>
      </div>
      <div className={styles.buttoncontainer}>
        <div className={styles.btncontainer}>
          <Button sx={{ width: 201 }} variant='outlined' color='primary'>
            Withdraw
          </Button>
          <Button sx={{ width: 201 }} variant='contained' color='primary'>
            Deposit
          </Button>
        </div>
        <Button
          className={styles.btnText}
          sx={{ width: 412 }}
          variant='outlined'
          color='primary'
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default DepositedTokensContainer;
