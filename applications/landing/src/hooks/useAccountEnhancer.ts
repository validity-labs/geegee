import { useEffect, useMemo, useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0';

import { useWalletSelector } from '@/context/WalletSelectorContext';
import { Account } from '@/typings/app';

const useAccountEnhancer = (): Account => {
  const {
    user: { sub: id /* , ...authUser */ } = { sub: null },
    error: authError,
    isLoading: isAuthLoading,
  } = useUser();
  // eslint-disable-next-line no-unused-vars
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
    const signOut = async () => {
      const wallet = await selector.wallet();

      wallet.signOut().catch((err) => {
        console.log("Failed to sign out from wallet");
        console.error(err);
      });
    }
    if (!isAuthLoading && id === null && accountId) {
      signOut();
    }
  }, [id, accountId, selector, isAuthLoading])

  useEffect(() => {
    const fetchBalance = async () => {

      if (!accountId) {
        return null;
      }

      const params = new URLSearchParams();
      params.append('id', accountId);

      let response = await fetch(`/api/grant?${params.toString()}`);

      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let { result, error } = await response.json();
        if (error) {
          console.log('grant result failed with error', error);
        } else {
          console.log('grant result true', result);
          setBalance(result.balance || '0');
        }
      } else {
        console.log('grant not ok');
      }

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
