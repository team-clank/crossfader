import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from 'react-router-dom';
import Landing from './pages/Landing';
import SSO from './pages/SSO';
import { VaultDefault } from './pages/VaultDefault';
import SubscribeDefault from './pages/SubscribeDefault';
import Loading from './pages/Loading';
import LimitDefaultContent from './pages/LimitDefault';
import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';
import axios from 'axios';

import { state } from './components/AppState';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const { account, signAndSubmitTransaction } = useWallet();
  const [appState, setAppState] = useState(state.signUp);

  if (location.pathname === '/createAcc2') {
    OauthCallback(
      'http://localhost:3000/createAcc2',
      'http://localhost:5000/createAcc2',
      account?.address
    );
  }
  if (location.pathname === '/overwithdraw') {
    OauthCallback(
      'http://localhost:3000/overwithdraw',
      'http://localhost:5000/overWithdraw',
      account?.address
    );
  }

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  if (account == null) {
    return (
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/vault' element={<Landing />} />
      </Routes>
    );
  } else {
    if (appState == state.signUp) {
      return (
        <Routes>
          <Route path='/' element={<SSO setSignUpState={setAppState} />} />
          <Route
            path='/createAcc2'
            element={
              <LimitDefaultContent
                account={account}
                signAndSubmitTransaction={signAndSubmitTransaction}
              />
            }
          />
          <Route
            path='/subscribe'
            element={<SubscribeDefault setSignUpState={setAppState} />}
          />
          <Route path='/vault' element={<Landing />} />
        </Routes>
      );
    } else if (appState == state.isLoading) {
      return (
        <Routes>
          <Route
            path='/subscribe'
            element={
              <Loading
                account={account}
                signAndSubmitTransaction={signAndSubmitTransaction}
                setState={setAppState}
                state={state.showVault}
              />
            }
          />
          <Route path='/vault' element={<Landing />} />
        </Routes>
      );
    } else if (appState == state.showVault) {
      return (
        <Routes>
          <Route path='/' element={<VaultDefault account={account} />} />;
          <Route
            path='/subscribe'
            element={<VaultDefault account={account} />}
          />
          ;
          <Route path='/vault' element={<VaultDefault account={account} />} />;
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path='/' element={<VaultDefault account={account} />} />;
          <Route path='/vault' element={<VaultDefault account={account} />} />;
        </Routes>
      );
    }
  }
}

//인증 파트.
const client_id =
  '612876662130-e10opej3r5l0dggntuigu7jjhoto382l.apps.googleusercontent.com';
const client_secret = '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';
function OauthCallback(
  redirect_uri: string,
  server_uri: string,
  acc1: string | undefined
) {
  if (acc1 == undefined) {
    console.log('acc1 address missing');
    return;
  }
  const code = new URL(window.location.href).searchParams.get('code');
  if (!code) {
    alert('No code provided in the callback');
    return;
  }
  axios
    .post('https://oauth2.googleapis.com/token', {
      code,
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
    })
    .then((response) => {
      if (response.status !== 200) {
        alert('Failed to exchange authorization code for access token');
        return;
      }
      const access_token = response.data.access_token;
      console.log(access_token);

      // store the access token for the user in a secure manner
      // ...
      axios
        .post(server_uri, {
          acc1: acc1,
          access_token,
        })
        .then((res) => {
          console.log(res);
          // address missing일 경우 경고 문구 발생.
          if (res.data === 'acc1 address missing')
            alert('acc1 address missing');
          //+++acc1 문제 없이 로그인 되었을 때 실행할 코드 추가./////
        });
    });
}
export default App;
