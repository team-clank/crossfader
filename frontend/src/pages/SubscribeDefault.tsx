import { FunctionComponent } from 'react';
import NavContainer from '../components/NavContainer';
import SecurityAlertForm from '../components/SecurityAlertForm';
import Footer from '../components/Footer';
import styles from './SubscribeDefault.module.css';

const SubscribeDefault = ({
  setSignUpState,
}: {
  setSignUpState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={styles.subscribeDefault}>
      <div className={styles.body}>
        <NavContainer logoImageUrl='../logo2.svg' />
        <SecurityAlertForm setSignUpState={setSignUpState} />
        <Footer subtract='../subtract.svg' />
      </div>
    </div>
  );
};

export default SubscribeDefault;
