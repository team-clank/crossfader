import { AptosClient, Types } from 'aptos';
import { AccountInfo } from '@aptos-labs/wallet-adapter-core';

const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';
const client = new AptosClient(NODE_URL);
const submitTransaction = async ({
  account,
  signAndSubmitTransaction,
  payload,
}: {
  account: AccountInfo | null;
  signAndSubmitTransaction: <T extends Types.TransactionPayload, V>(
    transaction: T,
    options?: V | undefined
  ) => Promise<any>;
  payload: {
    type: string;
    function: string;
    type_arguments: Array<string>;
    arguments: Array<any>;
  };
}) => {
  console.log('not implemented send transaction');
  return [];
  if (!account) return [];
  try {
    // sign and submit transaction to chain
    const response = await signAndSubmitTransaction(payload);
    // wait for transaction
    await client.waitForTransaction(response.hash);
  } catch (error: any) {}
};

export { client, submitTransaction };
