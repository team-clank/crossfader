import { useState } from 'react';
import { FormControlLabel, Checkbox, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './SecurityAlertForm.module.css';
import { state } from './AppState';

const SecurityAlertForm = ({
  setSignUpState,
}: {
  setSignUpState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className={styles.contentscontainer}>
      <AlertMessage />
      <div className={styles.checkboxcontainer}>
        <FormControlLabel
          className={styles.checkbox}
          label=''
          labelPlacement='end'
          control={
            <Checkbox color='primary' size='medium' onChange={handleChange} />
          }
        />
        <div className={styles.text1}>
          I have read and understand the privacy and cookies policy and agree to
          receive personalized communications from Clank by Email
        </div>
      </div>
      <ButtonContainer disabled={!checked} setSignUpState={setSignUpState} />
    </div>
  );
};

const AlertMessage = () => {
  return (
    <div className={styles.textcontainer}>
      <b className={styles.title}>
        <p className={styles.subscribe}>Subscribe</p>
        <p className={styles.theSecurityAlert}>the security alert</p>
      </b>
      <div className={styles.text}>
        <p className={styles.subscribe}>
          <span className={styles.weWillInform}>{`We will inform `}</span>
          <span className={styles.emailgmailcom}>{`{{email@gmail.com}}`}</span>
          <span> not only</span>
        </p>
        <p className={styles.theSecurityAlert}>
          <span>the security alert but also the news from Clank.</span>
        </p>
      </div>
    </div>
  );
};

const ButtonContainer = ({
  disabled,
  setSignUpState,
}: {
  disabled: boolean;
  setSignUpState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleClick = () => {
    setSignUpState(state.isLoading);
  };

  if (disabled) {
    return (
      <div className={styles.buttoncontainer}>
        <Button variant='outlined' color='primary' disabled>
          Let me know
        </Button>
        <div className={styles.btnnamet} onClick={handleClick}>
          Later
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.buttoncontainer}>
        <Button variant='outlined' color='primary' onClick={handleClick}>
          Let me know
        </Button>
        <div className={styles.btnnamet} onClick={handleClick}>
          Later
        </div>
      </div>
    );
  }
};

export default SecurityAlertForm;
