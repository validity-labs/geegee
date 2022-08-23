import { useEffect, useMemo, useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import { providers, utils } from "near-api-js";

import { useWalletSelector } from '@/context/WalletSelectorContext';
// import { GEEBUCK_ADDRESS, GEEGEE_ADDRESS } from '@/libs/constants';
// import { getGeebuckBalance } from '@/libs/near-api';
import { Account } from '@/typings/app';

const GAS = utils.format.parseNearAmount("0.009000000000000000000002")!;

const useAccountEnhancer = (): Account => {
  const {
    user: { sub: id /* , ...authUser */ } = { sub: null },
    error: authError,
    isLoading: isAuthLoading,
  } = useUser();
  const [balance, setBalance] = useState<number | null>(null);
  const { accountId, selector } = useWalletSelector();
  const { isOnline, isOffline, isLoading, isError /* , meta */ } = useMemo(() => {
    const isOnline = !isAuthLoading && !authError && !!id;
    // console.log('useAccountEnhancer, change flags', id, authError, isAuthLoading, isOnline);
    return {
      isOnline,
      isOffline: !isOnline,
      isLoading: isAuthLoading,
      isError: !!authError,
      // meta: user?.extra || {},
    };
  }, [id, authError, isAuthLoading]);

  useEffect(() => {
    const fetchBalance = async () => {

      if (!accountId) {
        return null;
      }

      const { network } = selector.options;
      const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

      const { contract } = selector.store.getState();
      const wallet = await selector.wallet();
      wallet
        .signAndSendTransaction({
          signerId: accountId!,
          receiverId: contract!.contractId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "register_account",
                args: { user_account: accountId },
                gas: GAS!,
                deposit: utils.format.parseNearAmount('0')!,
              },
            },
          ],
        })
        .catch((err) => {
          console.log("Failed to register account");
          throw err;
        });


      // const balanceData = await provider
      //   .query<any>({
      //     request_type: "call_function",
      //     finality: "final",
      //     account_id: GEEBUCK_ADDRESS,
      //     method_name: 'ft_balance_of',
      //     args_base64: btoa(JSON.stringify({ account_id: accountId })),
      //   });

      // const balance = +JSON.parse(Buffer.from(balanceData.result).toString());

      // const metadata = await provider
      //   .query<any>({
      //     request_type: "call_function",
      //     finality: "final",
      //     account_id: GEEBUCK_ADDRESS,
      //     method_name: 'ft_metadata',
      //     args_base64: btoa(JSON.stringify({})),
      //   });

      // const { decimals } = JSON.parse(Buffer.from(metadata.result).toString());

      // setBalance(await getGeebuckBalance(accountId)); // TODO: pass user's address
    };
    if (isOnline && accountId) {
      fetchBalance();
    }
  }, [accountId, isOnline, selector]);

  return {
    // meta,
    balance,
    isOnline,
    isOffline,
    isLoading,
    isError,
    isBalanceLoading: !balance,
  };
};

export default useAccountEnhancer;
