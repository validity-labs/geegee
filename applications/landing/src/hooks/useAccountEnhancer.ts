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
    const fetchBalance = async () => {

      if (!accountId) {
        return null;
      }

      const params = new URLSearchParams();
      params.append('id', accountId);

      let response = await fetch(`/api/grant?${params.toString()}`);

      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let { result } = await response.json();
        if (result) {
          console.log('grant result true', result);
        } else {
          console.log('grant result false');

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
