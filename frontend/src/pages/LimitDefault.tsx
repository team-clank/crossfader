import NavContainer from '../components/NavContainer';
import WithdrawalAptosLimitForm from '../components/WithdrawalAptosLimitForm';
import Footer from '../components/Footer';
import styles from './LimitDefault.module.css';
import { AccountInfo } from '@aptos-labs/wallet-adapter-core';
import { Types } from 'aptos';

const LimitDefaultContent = ({
  account,
  signAndSubmitTransaction,
}: {
  account: AccountInfo | null;
  signAndSubmitTransaction: <T extends Types.TransactionPayload, V>(
    transaction: T,
    options?: V | undefined
  ) => Promise<any>;
}) => {
  return (
    <div className={styles.limitDefault}>
      <div className={styles.body} id='SetWithdrawal-container'>
        <NavContainer logoImageUrl='../logo6.svg' />
        <WithdrawalAptosLimitForm
          account={account}
          signAndSubmitTransaction={signAndSubmitTransaction}
        />
        <Footer subtract='../subtract1.svg' />
      </div>
    </div>
  );
};

export default LimitDefaultContent;
