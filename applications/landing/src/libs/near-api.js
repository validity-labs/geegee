import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
import { getConfig } from './near-config';

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig)
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our geebuck APIs by contract name and configuration
  window.geebuck = await new Contract(window.walletConnection.account(), nearConfig.geebuckAddress, {
    viewMethods: ['ft_balance_of', 'ft_metadata']
  });

  console.log({ geebuck: window.geebuck });
}

export function signOutNearWallet() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function signInWithNearWallet() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function getGeebuckBalance(accountId) {
  let balance = await window.geebuck.ft_balance_of({
    account_id: accountId
  });
  let ft_metadata = await window.geebuck.ft_metadata({});
  return balance / Math.pow(10, ft_metadata.decimals | 0);
}

export async function getGeebuckTransactions(accountId) {}

async function getTransactions(startBlock, endBlock, accountId) {
  const near = await connect(config);

  // creates an array of block hashes for given range
  const blockArr = [];
  let blockHash = endBlock;
  do {
    const currentBlock = await getBlockByID(blockHash);
    blockArr.push(currentBlock.header.hash);
    blockHash = currentBlock.header.prev_hash;
    console.log('working...', blockHash);
  } while (blockHash !== startBlock);

  // returns block details based on hashes in array
  const blockDetails = await Promise.all(
    blockArr.map((blockId) =>
      near.connection.provider.block({
        blockId
      })
    )
  );

  // returns an array of chunk hashes from block details
  const chunkHashArr = blockDetails.flatMap((block) => block.chunks.map(({ chunk_hash }) => chunk_hash));

  //returns chunk details based from the array of hashes
  const chunkDetails = await Promise.all(chunkHashArr.map((chunk) => near.connection.provider.chunk(chunk)));

  // checks chunk details for transactions
  // if there are transactions in the chunk we
  // find ones associated with passed accountId
  const transactions = chunkDetails.flatMap((chunk) =>
    (chunk.transactions || []).filter((tx) => tx.signer_id === accountId)
  );

  //creates transaction links from matchingTxs
  const txsLinks = transactions.map((txs) => ({
    method: txs.actions[0].FunctionCall.method_name,
    link: `https://explorer.testnet.near.org/transactions/${txs.hash}`
  }));
  console.log('MATCHING TRANSACTIONS: ', transactions);
  console.log('TRANSACTION LINKS: ', txsLinks);
}
