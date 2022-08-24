import { connect, ConnectConfig, Contract, KeyPair, keyStores /* WalletConnection */, utils } from 'near-api-js';
import type { NextApiRequest, NextApiResponse } from 'next'

import { GEEBUCK_ADDRESS, GEEGEE_ADDRESS } from '@/libs/constants';
import getConfig from '@/libs/env';

const { serverRuntimeConfig: { adminWalletId, adminWalletPrivateKey, nearNetwork } = {} } = getConfig();


/* TODO move this to environment variable */
const DEPOSIT = utils.format.parseNearAmount('0.009000000000000000000002');
const GAS = "300000000000000";

type ResponseData = {
  result: {
    balance: string;
  };
  // message?: string
  error?: string;

}

interface ApiRequest extends NextApiRequest {
  query: {
    id: string;
  }
}

export default async function handler(
  req: ApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {

    if (!(adminWalletId && adminWalletPrivateKey && nearNetwork)) {
      throw new Error('Missing required credentials for admin wallet');
    }

    const query = req.query;
    const { id: walletId } = query;

    // creates keyStore from a private key string
    const keyStore = new keyStores.InMemoryKeyStore();
    // creates a public / private key pair using the provided private key
    const keyPair = KeyPair.fromString(adminWalletPrivateKey);
    // adds the keyPair you created to keyStore
    await keyStore.setKey(nearNetwork, adminWalletId, keyPair);


    const connectionConfig: ConnectConfig = {
      networkId: nearNetwork,
      keyStore: keyStore, // first create a key store
      // use map for network metadata
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      // explorerUrl: "https://explorer.testnet.near.org",
      headers: {},
    };
    const nearConnection = await connect(connectionConfig);

    const account = await nearConnection.account(adminWalletId);
    // const balance = await account.getAccountBalance();
    // console.log(utils.format.formatNearAmount(balance.total));

    const geeGeeContract = new Contract(account, GEEGEE_ADDRESS, {
      viewMethods: ["check_registered"],
      changeMethods: ["register_account"],
    });

    const args = { user_account: walletId };

    /* @ts-ignore */
    let isRegistered = await geeGeeContract.check_registered(args);


    if (!isRegistered) {
      /* @ts-ignore */
      /* const test =  */await geeGeeContract.register_account({
      args,
      amount: DEPOSIT,
      gas: GAS,
    });
      // console.log('register account', test);

      /* @ts-ignore */
      // isRegistered = await geeGeeContract.check_registered(args);
      // console.log('isRegistered', isRegistered);
    }

    const geeBuckContract = new Contract(account, GEEBUCK_ADDRESS, {
      viewMethods: ["ft_balance_of", "ft_metadata"],
      changeMethods: [],
    });

    // console.log(GEEBUCK_ADDRESS, GEEGEE_ADDRESS);
    /* @ts-ignore */
    const balance = await geeBuckContract.ft_balance_of({ account_id: walletId });
    /* @ts-ignore */
    const { decimals } = await geeBuckContract.ft_metadata({});
    // console.log(balance, decimals, utils.format.formatNearAmount(balance));

    const formattedBalance = balance / Math.pow(10, decimals | 0);

    res.status(200).json({ result: { balance: formattedBalance.toString() } });
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).json({ result: { balance: '0' }, error: 'Something went wrong.' })
  }
}
