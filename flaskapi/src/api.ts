import express, { Request, Response } from 'express';
import cors from "cors";
import { AptosAccount } from 'aptos';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
const vaultAcc = "";
var accountData: { [key: string]: { emailAddress: string, acc2: AptosAccount } } = {};
const client_id = '612876662130-e10opej3r5l0dggntuigu7jjhoto382l.apps.googleusercontent.com';

app.post('/createAcc2', async (req: Request, res: Response) => {
  var acc1 = ""
  var access_token = 0
  try {
    const data = req.body;
    acc1 = data.acc1
    access_token = data.access_token;
  } catch (error) {
    return res.send('acc1 address missing');
  }
  const token_info_url = `https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`;
  axios.get(token_info_url)
    .then((response) => {
      if (response.status === 200) {
        const token_info = response.data;
        if ('error' in token_info) {
          return "authorization fail"
        }
        if (token_info.aud !== client_id) {
          return "wrong client_id"
        }
        const acc2 = new AptosAccount();
        accountData[acc1] = { emailAddress: token_info.email, acc2: acc2 }
        return acc2.address;
      }
      else return "google response status not 200";
    });
});

app.post('/overWithdraw', async (req: Request, res: Response) => {
  var txdata = 0;
  var acc1 = 0 ;
  var access_token = 0;
  console.log(req);
  try {
    const data = req.body;
    acc1 = data["acc1"];
    access_token = data.access_token;
    txdata = data.txdata;
  } catch (error) {
    return res.send('acc1 address missing');
  }    
  const token_info_url = `https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`;
  //oauth 검증 파트
  axios.get(token_info_url)
    .then((response) => {
      if (response.status === 200) {
        const token_info = response.data;
        if ('error' in token_info) {
          return "authorization fail"
        }
        if (token_info.aud !== client_id) {
          return "wrong client_id"
        }
        if (accountData[acc1].emailAddress !== token_info.email) {
          return res.send('email authorization fail');
        }
        const acc2 = new AptosAccount();
        accountData[acc1] = { emailAddress: token_info.email, acc2: acc2 }
        return acc2.address;
      }
      else return "google response status not 200";
    });
    //트랜잭션 전송 파트.
    
});

app.listen(5000, () => {
  console.log("api server success");
})