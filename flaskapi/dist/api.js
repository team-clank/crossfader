"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const aptos_1 = require("aptos");
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*', optionsSuccessStatus: 200 }));
app.use(body_parser_1.default.json());
const vaultAcc = "";
var accountData = {};
const client_id = '612876662130-e10opej3r5l0dggntuigu7jjhoto382l.apps.googleusercontent.com';
app.post('/createAcc2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var acc1 = "";
    var access_token = 0;
    try {
        const data = req.body;
        acc1 = data.acc1;
        access_token = data.access_token;
    }
    catch (error) {
        return res.send('acc1 address missing');
    }
    const token_info_url = `https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`;
    oauthVerifyCall(token_info_url, acc1);
    // axios.get(token_info_url)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       const token_info = response.data;
    //       if ('error' in token_info) {
    //         return "authorization fail"
    //       }
    //       if (token_info.aud !== client_id) {
    //         return "wrong client_id"
    //       }
    //       const acc2 = new AptosAccount();
    //       accountData[acc1] = { emailAddress: token_info.email, acc2: acc2 }
    //       return acc2.address;
    //     }
    //     else return "google response status not 200";
    //   });
}));
app.post('/overWithdraw', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var txdata = 0;
    var acc1 = 0;
    var access_token = 0;
    console.log(req);
    try {
        const data = req.body;
        acc1 = data["acc1"];
        access_token = data.access_token;
        txdata = data.txdata;
    }
    catch (error) {
        return res.send('acc1 address missing');
    }
    const client_id = '612876662130-e10opej3r5l0dggntuigu7jjhoto382l.apps.googleusercontent.com';
    const token_info_url = `https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`;
    const response = yield fetch(token_info_url);
    if (response.status === 200) {
        const token_info = yield response.json();
        if ('error' in token_info) {
            return res.send('authorization fail');
        }
        else if (token_info.get('aud') !== client_id) {
            return res.send('authorization fail');
        }
        else {
            if (accountData[acc1].emailAddress !== token_info.email) {
                return res.send('email authorization fail');
            }
        }
    }
    else {
        return res.send('authorization fail');
    }
}));
function oauthVerifyCall(token_info_url, acc1) {
    axios_1.default.get(token_info_url)
        .then((response) => {
        if (response.status === 200) {
            const token_info = response.data;
            if ('error' in token_info) {
                return "authorization fail";
            }
            if (token_info.aud !== client_id) {
                return "wrong client_id";
            }
            const acc2 = new aptos_1.AptosAccount();
            accountData[acc1] = { emailAddress: token_info.email, acc2: acc2 };
            return acc2.address;
        }
        else
            return "google response status not 200";
    });
}
app.listen(5000, () => {
    console.log("api server success");
});
