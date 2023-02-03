import { useState } from 'react';
import BackgroundContainer from '../components/BackgroundContainer';
import Footer from '../components/Footer';
import styles from './Loading.module.css';
import { AccountInfo } from '@aptos-labs/wallet-adapter-core';
import { Types } from 'aptos';
import { submitTransaction } from '../components/AptosClient';

const Loading = ({
  account,
  signAndSubmitTransaction,
  setState,
  state,
}: {
  account: AccountInfo | null;
  signAndSubmitTransaction: <T extends Types.TransactionPayload, V>(
    transaction: T,
    options?: V | undefined
  ) => Promise<any>;
  setState: React.Dispatch<React.SetStateAction<number>>;
  state: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  sendTransaction({ account, signAndSubmitTransaction, setIsLoading });
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.body}>
          <div className={styles.nav}>
            <div className={styles.logo} />
            <div className={styles.btnText} id='Loading-address-container'>
              <div className={styles.btnname}>0xfew...og2s</div>
            </div>
          </div>
          <BackgroundContainer />
          <Footer subtract='../subtract.svg' />
        </div>
        <div className={styles.negativedim} />
        <img className={styles.logoIcon} alt='' src='../logo.svg' />
      </div>
    );
  } else {
    setState(state);
    return <div>hi</div>;
  }
};

const sendTransaction = async ({
  account,
  signAndSubmitTransaction,
  setIsLoading,
}: {
  account: AccountInfo | null;
  signAndSubmitTransaction: <T extends Types.TransactionPayload, V>(
    transaction: T,
    options?: V | undefined
  ) => Promise<any>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const payload = {
    type: 'entry_function_payload',
    function: `moduleaddress::main::create_list`,
    type_arguments: [],
    arguments: [],
  };
  await submitTransaction({ account, signAndSubmitTransaction, payload });
  setIsLoading(false);
};

export default Loading;
