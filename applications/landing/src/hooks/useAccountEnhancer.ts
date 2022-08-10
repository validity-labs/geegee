import { useEffect, useMemo, useState } from "react";

import { useUser } from "@auth0/nextjs-auth0";

import { sleep } from "@/libs/helpers";
import { Account } from "@/typings/app";

const useAccountEnhancer = (): Account => {
  const { user: { sub: id/* , ...authUser */ } = { sub: null }, error: authError, isLoading: isAuthLoading } = useUser();
  const [balance, setBalance] = useState<number | null>(null);

  const { isOnline, isOffline, isLoading, isError/* , meta */ } = useMemo(() => {
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
      await sleep(1);
      setBalance(0.1372);
    }
    if (isOnline && id) {
      // console.log('useAccountEnhancer, fetch balance for', id);
      fetchBalance();
    }
  }, [id, isOnline]);


  return {
    // meta,
    balance,
    isOnline,
    isOffline,
    isLoading,
    isError,
    isBalanceLoading: !balance,
  };
}

export default useAccountEnhancer;
