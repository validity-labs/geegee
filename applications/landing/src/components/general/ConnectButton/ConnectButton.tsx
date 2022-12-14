import React, { /* FormEvent, */ useCallback, useEffect, useState } from "react";

import { useTranslation } from "next-i18next";

import { Button, CircularProgress, GlobalStyles } from "@mui/material";
// import { Transaction } from "@near-wallet-selector/core";
import { providers /* utils */ } from "near-api-js";
import type {
  AccountView,
  // CodeResult,
} from "near-api-js/lib/providers/provider";

import "@near-wallet-selector/modal-ui/styles.css";
// import Form from "./Form";
// import Messages from "./Messages";
import { useWalletSelector } from "@/context/WalletSelectorContext";
// import { GEEBUCK_ADDRESS } from "@/libs/constants";
import type { Account/* , Message */ } from "@/typings/wallet-selector";

// const SUGGESTED_DONATION = "0";
// const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

const globalStyles = `
  :root {
    --wallet-selector-backdrop-bg: linear-gradient(123deg, #1F1F21 0%, #140816 53%, #31105C 100%) no-repeat;
    --wallet-selector-heading-color: #ffffff;
    --wallet-selector-text-color: #ffffff;
    --wallet-selector-selected-wallet-bg: #393246;
    --wallet-selector-selected-wallet-bg-hover: #393246;
    --deprecated-wallet-bg: #393246;
    --wallet-selector-wallet-option-border-color: #393246;
    --wallet-selector-content-bg: #231B30;
    // --wallet-selector-input-border-color-focus: #393246;
    --wallet-selector-box-shadow-color: #FD00FD;
    // --wallet-selector-dismiss-button-bg-hover: #393246;
    // --wallet-selector-dismiss-button-border-color-hover: #393246;
    // --wallet-selector-confirm-button-color:  #ffffff;
    // --wallet-selector-confirm-button-bg: #393246;
    // --wallet-selector-confirm-button-bg-hover: #393246;
    // --wallet-selector-confirm-button-border-color: #393246;
    // --wallet-selector-error: #b40000;
    // --wallet-selector-close-button-color: #393246;
    // --wallet-selector-spinner-color: #F631F6;
  }
  #near-wallet-selector-modal {
    h2 {
      font-family: Audiowide, cursive;
      font-size: 1.5625rem; // 25px
      text-align: center;
    }
  }
`;



const ConnectButton: React.FC = () => {
  const { t } = useTranslation();
  const { selector, modal, /* accounts, */ accountId } = useWalletSelector();
  const [account, setAccount] = useState<Account | null>(null);
  // const [messages, setMessages] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.options]);

  // const getMessages = useCallback(() => {
  //   const { network } = selector.options;
  //   const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

  //   return provider
  //     .query<CodeResult>({
  //       request_type: "call_function",
  //       account_id: GEEBUCK_ADDRESS,
  //       method_name: "getMessages",
  //       args_base64: "",
  //       finality: "optimistic",
  //     })
  //     .then((res) => JSON.parse(Buffer.from(res.result).toString()));
  // }, [selector]);

  // useEffect(() => {
  //   // TODO: don't just fetch once; subscribe!
  //   getMessages().then(setMessages);
  // }, []);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setLoading(true);

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
      setLoading(false);
    });
  }, [accountId, getAccount]);

  // const handleSignIn = () => {
  //   console.log('sign in', modal);
  //   modal.show();
  // };

  // const handleSignOut = async () => {
  //   const wallet = await selector.wallet();

  //   wallet.signOut().catch((err) => {
  //     console.log("Failed to sign out");
  //     console.error(err);
  //   });
  // };

  const handleSignAction = useCallback(async () => {
    if (account) {
      const wallet = await selector.wallet();

      wallet.signOut().catch((err) => {
        console.log("Failed to sign out");
        console.error(err);
      });
    } else {
      modal.show();
    }
  }, [account, modal, selector])
  // const handleSwitchWallet = () => {
  //   modal.show();
  // };

  // const handleSwitchAccount = () => {
  //   const currentIndex = accounts.findIndex((x) => x.accountId === accountId);
  //   const nextIndex = currentIndex < accounts.length - 1 ? currentIndex + 1 : 0;

  //   const nextAccountId = accounts[nextIndex].accountId;

  //   selector.setActiveAccount(nextAccountId);

  //   alert("Switched account to " + nextAccountId);
  // };

  // const addMessages = useCallback(
  //   async (message: string, donation: string, multiple: boolean) => {
  //     const { contract } = selector.store.getState();
  //     const wallet = await selector.wallet();

  //     if (!multiple) {
  //       return wallet
  //         .signAndSendTransaction({
  //           signerId: accountId!,
  //           actions: [
  //             {
  //               type: "FunctionCall",
  //               params: {
  //                 methodName: "addMessage",
  //                 args: { text: message },
  //                 gas: BOATLOAD_OF_GAS,
  //                 deposit: utils.format.parseNearAmount(donation)!,
  //               },
  //             },
  //           ],
  //         })
  //         .catch((err) => {
  //           alert("Failed to add message");
  //           console.log("Failed to add message");

  //           throw err;
  //         });
  //     }

  //     const transactions: Array<Transaction> = [];

  //     for (let i = 0; i < 2; i += 1) {
  //       transactions.push({
  //         signerId: accountId!,
  //         receiverId: contract!.contractId,
  //         actions: [
  //           {
  //             type: "FunctionCall",
  //             params: {
  //               methodName: "addMessage",
  //               args: {
  //                 text: `${message} (${i + 1}/2)`,
  //               },
  //               gas: BOATLOAD_OF_GAS,
  //               deposit: utils.format.parseNearAmount(donation)!,
  //             },
  //           },
  //         ],
  //       });
  //     }

  //     return wallet.signAndSendTransactions({ transactions }).catch((err) => {
  //       alert("Failed to add messages");
  //       console.log("Failed to add messages");

  //       throw err;
  //     });
  //   },
  //   [selector, accountId],
  // );

  // const handleVerifyOwner = async () => {
  //   const wallet = await selector.wallet();
  //   try {
  //     const owner = await wallet.verifyOwner({
  //       message: "test message for verification",
  //     });

  //     if (owner) {
  //       alert(`Signature for verification: ${JSON.stringify(owner)}`);
  //     }
  //   } catch (err) {
  //     const message =
  //       err instanceof Error ? err.message : "Something went wrong";
  //     alert(message);
  //   }
  // };

  // const handleSubmit = useCallback(
  //   async (e: FormEvent) => {
  //     e.preventDefault();

  //     // TODO: Fix the typing so that target.elements exists..
  //     // @ts-ignore.
  //     const { fieldset, message, donation, multiple } = e.target.elements;

  //     fieldset.disabled = true;

  //     return addMessages(message.value, donation.value || "0", multiple.checked)
  //       .then(() => {
  //         return getMessages()
  //           .then((nextMessages) => {
  //             setMessages(nextMessages);
  //             message.value = "";
  //             donation.value = SUGGESTED_DONATION;
  //             fieldset.disabled = false;
  //             message.focus();
  //           })
  //           .catch((err) => {
  //             alert("Failed to refresh messages");
  //             console.log("Failed to refresh messages");

  //             throw err;
  //           });
  //       })
  //       .catch((err) => {
  //         console.error(err);

  //         fieldset.disabled = false;
  //       });
  //   },
  //   [addMessages, getMessages],
  // );

  return (
    <>
      <GlobalStyles styles={globalStyles} />
      <Button onClick={handleSignAction} >
        {loading ? <CircularProgress size="small" /> : (t(`common.${account ? 'dis' : ''}connect-wallet`)
        )}
      </Button>
    </>
  );
};

export default ConnectButton;

// <button onClick={handleSignIn}>Log in</button>
// <button onClick={handleSignOut}>Log out</button>
// {/* <button onClick={handleSwitchWallet}>Switch Wallet</button>
// <button onClick={handleVerifyOwner}>Verify Owner</button>
// {accounts.length > 1 && (
//   <button onClick={handleSwitchAccount}>Switch Account</button>
// )} */}
//   {/* <Form
//     account={account}
//     onSubmit={(e) => handleSubmit(e as unknown as FormEvent)}
//   />
//   <Messages messages={messages} /> */}
