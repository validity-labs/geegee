import Web3 from "web3";
import { BigNumber as BN } from "bignumber.js";
import { erc20Abi, swapEngineAbi } from "../abis";
import { REQUIRED_CONFIRMATIONS, V1_TOTAL_SUPPLY } from "../constants";

const { toBN, fromWei } = Web3.utils;

// V1: 0x50c9223E04f36a547b2d44121085647b736Ee00a
// V2: 0x755665f26B5cEd25Ec3D92AA3c99C3aC25668Fa3

// Bingo: 0xbA6e6237d40BA6D401D775198222D580BF62791b
// Bongo: 0x79591b82E4A88255fbC4ecb7255E2EC24bBc4b3c

export const getV1ContractAddress = (networkId: number) =>
  networkId === 1 ? "0x660e78e77b0a4eef978ef198c7229259f0eff8ac" : "0xC34331aA6949d873df29158F88DcF6b48DEDA028";
export const getV2ContractAddress = (networkId: number) => (networkId === 1 ? "0xdC47f2Ba852669B178699449E50682D6CEAF8C07" : "0x5477029Ea8532f12A5509b656103A345c4bF357f");
const getEngineContractAddress = (networkId: number) => (networkId === 1 ? "0x12e9698087AAFa686efB2faFb19e2e8aE98aF0e2" : "0x4fe37b3be745918aC911BBb39323F254aAa0d4Bf");
// const confirmationBlockNumber = (networkId: number) => (networkId === 1 ? NUMBER_OF_CONFIRMATIONS_ETH[0] : NUMBER_OF_CONFIRMATIONS_ETH[1]);

const convertToHex = (web3: Web3, value: string): string => {
  return web3.utils.toHex(value);
};

export const getNetworkId = async (web3: Web3): Promise<number> => web3.eth.net.getId();

export const approveTokenTransfer = async (
  web3: Web3,
  amount: number,
  fromAddress: string,
  onError: () => void,
  onTransactionHash: () => void,
  onCompletion?: () => void
) => {
  try {
    const networkId = await getNetworkId(web3);
    // web3.eth.transactionConfirmationBlocks = confirmationBlockNumber(networkId);
    const v1TokenAddress = getV1ContractAddress(networkId);
    const v1TokenContract = new web3.eth.Contract(JSON.parse(erc20Abi), v1TokenAddress);

    const tokenAmount = amount === 0 ? "0" : convertToHex(web3, V1_TOTAL_SUPPLY);
    const engineContractAddress = getEngineContractAddress(networkId);
    const estimatedGasLimit = await v1TokenContract.methods.approve(engineContractAddress, tokenAmount).estimateGas({ from: fromAddress });
    const gasPrice = await web3.eth.getGasPrice();

    await v1TokenContract.methods
      .approve(engineContractAddress, tokenAmount)
      .send({ from: fromAddress, gas: estimatedGasLimit, gasPrice })
      .on("transactionHash", (_transactionHash: string) => {
        onTransactionHash();
        return;
      })
      .on("error", (error: string) => {
        console.log(`approval error: ${error}`);
        onError();
        return;
      })
      .on("confirmation", (confirmations: number) => {
        console.log(confirmations);
        if (onCompletion && REQUIRED_CONFIRMATIONS === confirmations) {
          onCompletion();
        }
      });
  } catch (error) {
    console.error(error);
    onError();
  }
};

export const swapAllToken = async (web3: Web3, fromAddress: string, onError: () => void, onTransactionHash: () => void, onCompletion: () => void) => {
  try {
    const networkId = await getNetworkId(web3);
    const engineAddress = getEngineContractAddress(networkId);
    const engineContract = new web3.eth.Contract(JSON.parse(swapEngineAbi), engineAddress);
    const estimatedGasLimit = await engineContract.methods.swapAllToken(fromAddress).estimateGas({ from: fromAddress });
    const gasPrice = await web3.eth.getGasPrice();

    await engineContract.methods
      .swapAllToken(fromAddress)
      .send({ from: fromAddress, gas: estimatedGasLimit, gasPrice })
      .on("transactionHash", (_transactionHash: string) => {
        onTransactionHash();
      })
      .on("error", (error: string) => {
        console.error(`approval error: ${error}`);
        onError();
        return;
      })
      .on("confirmation", (confirmations: number) => {
        console.log(confirmations);
        if (onCompletion && REQUIRED_CONFIRMATIONS === confirmations) {
          console.log("onCompletion", confirmations);
          onCompletion();
        }
      });
  } catch (error) {
    console.error(error);
    onError();
  }
};

export const getAllowance = async (web3: Web3, fromAddress: string): Promise<string> => {
  const networkId = await getNetworkId(web3);
  const stonV1TokenAddress = getV1ContractAddress(networkId);
  const tokenContract = new web3.eth.Contract(JSON.parse(erc20Abi), stonV1TokenAddress);
  const allowance = await tokenContract.methods.allowance(fromAddress, getEngineContractAddress(networkId)).call();
  return new BN(allowance).div(new BN("100000000")).toString();
  // return (Number(allowance) / Math.pow(10, 8)).toString();
};

export const getBalances = async (web3: Web3, fromAddress: string): Promise<[string, string, string]> => {
  const networkId = await getNetworkId(web3);
  const stonV1TokenAddress = getV1ContractAddress(networkId);
  const stonV2TokenAddress = getV2ContractAddress(networkId);
  const v1Contract = new web3.eth.Contract(JSON.parse(erc20Abi), stonV1TokenAddress);
  const v2Contract = new web3.eth.Contract(JSON.parse(erc20Abi), stonV2TokenAddress);
  // const engineAddress = getEngineContractAddress(networkId);
  // const engineContract = new web3.eth.Contract(JSON.parse(swapEngineAbi), engineAddress);
  const [v1BalanceInWei, v2BalanceInWei, ethBalanceInWei] = await Promise.all([
    v1Contract.methods.balanceOf(fromAddress).call(),
    v2Contract.methods.balanceOf(fromAddress).call(),
    web3.eth.getBalance(fromAddress)
  ]);
  return [
    toBN(v1BalanceInWei.toString())
      .div(toBN(Math.pow(10, 8)))
      .toString(),
    fromWei(v2BalanceInWei.toString()),
    web3.utils.fromWei(ethBalanceInWei.toString())
  ];
};
