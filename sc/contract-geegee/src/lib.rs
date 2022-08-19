/*!
Some hypothetical DeFi contract that will do smart things with the transferred tokens
*/
use near_contract_standards::fungible_token::receiver::FungibleTokenReceiver;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::{
    env, ext_contract, log, near_bindgen, AccountId, Gas, Promise, Balance, PanicOnDefault, PromiseOrValue
};
use near_sdk::collections::{UnorderedMap};

pub const INIT_GAS: u64 = 10_000_000_000_000;
pub const INITIAL_DEPOSIT_AMOUNT: U128 = U128(9_000_000_000_000_000_000_000);
const MIN_STORAGE: Balance = 1_000_000_000_000_000_000_000;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct GeeGee {
    pub geebuck_account_id: AccountId,
    pub registered_users: UnorderedMap<AccountId, bool>,
}

#[ext_contract(ext_tf)]
pub trait GeeBuckToken {
    fn ft_transfer(
        &mut self,
        receiver_id: AccountId,
        amount: U128,
    );
    fn storage_deposit(
        &mut self,
        account_id: Option<AccountId>,
        registeration_only: Option<bool>,
    );
}

#[near_bindgen]
impl GeeGee {
    #[init]
    #[payable]
    pub fn new(geebuck_account_id: AccountId) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        let promise = ext_tf::ext(geebuck_account_id.clone())
            .with_attached_deposit(INITIAL_DEPOSIT_AMOUNT.into())
            .storage_deposit(Some(env::current_account_id()), None);
        
        Self {
            geebuck_account_id: geebuck_account_id.into(),
            registered_users: UnorderedMap::new(b"d"),
        }
    }

    #[private]
    pub fn register_user(&self, user_id: String) {
        let account_id = user_id + "." + &env::current_account_id().to_string();
        
        let promise = Promise::new(account_id.parse().unwrap()).create_account().transfer(MIN_STORAGE);
        let user_account: AccountId = account_id.parse().unwrap();
        
        promise.then(
            ext_tf::ext(self.geebuck_account_id.clone())
            .with_attached_deposit(INITIAL_DEPOSIT_AMOUNT.into())
            .storage_deposit(Some(user_account.clone()), None)
        ).then(
            ext_tf::ext(self.geebuck_account_id.clone())
            .with_attached_deposit(1)
            .ft_transfer(user_account, U128(50_000_000_000))
        );
    }
}
