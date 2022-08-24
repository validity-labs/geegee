/*!
Some hypothetical DeFi contract that will do smart things with the transferred tokens
*/
use near_contract_standards::fungible_token::receiver::FungibleTokenReceiver;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::json_types::U128;
use near_sdk::{
    env, ext_contract, log, near_bindgen, AccountId, Balance, Gas, PanicOnDefault, Promise,
    PromiseOrValue,
};

pub const INIT_GAS: Balance = 10_000_000_000_000;
pub const INITIAL_ATTACHED_AMOUNT: Balance = 8_000_000_000_000_000_000_000;
pub const STORAGE_COST: Balance = 1_000_000_000_000_000_000_000;
pub const GEEBUCK_STARTING_AMOUNT: Balance = 50_000_000_000;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct GeeGee {
    pub geebuck_account_id: AccountId,
    pub registered_users: UnorderedMap<AccountId, bool>,
}

#[ext_contract(ext_tf)]
pub trait GeeBuckToken {
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128);
    fn storage_deposit(&mut self, account_id: Option<AccountId>, registeration_only: Option<bool>);
}

#[near_bindgen]
impl GeeGee {
    #[init]
    #[payable]
    pub fn new(geebuck_account_id: AccountId) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        let promise = ext_tf::ext(geebuck_account_id.clone())
            .with_attached_deposit(INITIAL_ATTACHED_AMOUNT.into())
            .storage_deposit(Some(env::current_account_id()), None);

        Self {
            geebuck_account_id: geebuck_account_id.into(),
            registered_users: UnorderedMap::new(b"d"),
        }
    }

    #[private]
    #[payable]
    pub fn register_user(&mut self, user_id: String) {
        let total_required_cost = STORAGE_COST * 2 + INITIAL_ATTACHED_AMOUNT + 1;
        let attached_amount: Balance = env::attached_deposit();

        assert!(
            attached_amount > total_required_cost,
            "Attach at least {} yoctoNEAR",
            total_required_cost
        );

        let account_id = user_id + "." + &env::current_account_id().to_string();
        let user_account: AccountId = account_id.parse().unwrap();

        let mut is_registered = self.registered_users.get(&user_account).unwrap_or(false);
        assert!(!is_registered, "Already registered");

        let promise = Promise::new(account_id.parse().unwrap())
            .create_account()
            .transfer(STORAGE_COST);

        promise
            .then(
                ext_tf::ext(self.geebuck_account_id.clone())
                    .with_attached_deposit(INITIAL_ATTACHED_AMOUNT.into())
                    .storage_deposit(Some(user_account.clone()), None),
            )
            .then(
                ext_tf::ext(self.geebuck_account_id.clone())
                    .with_attached_deposit(1)
                    .ft_transfer(user_account.clone(), U128(GEEBUCK_STARTING_AMOUNT)),
            );
        self.registered_users.insert(&user_account, &true);
    }

    // #[private]
    #[payable]
    pub fn register_account(&mut self, user_account: AccountId) {
        let total_required_cost = STORAGE_COST + INITIAL_ATTACHED_AMOUNT + 1;
        let attached_amount: Balance = env::attached_deposit();

        assert!(
            attached_amount > total_required_cost,
            "Attach at least {} yoctoNEAR",
            total_required_cost
        );

        let mut is_registered = self.registered_users.get(&user_account).unwrap_or(false);
        assert!(!is_registered, "Already registered");

        let promise = ext_tf::ext(self.geebuck_account_id.clone())
            .with_attached_deposit(INITIAL_ATTACHED_AMOUNT.into())
            .storage_deposit(Some(user_account.clone()), None);
        promise.then(
            ext_tf::ext(self.geebuck_account_id.clone())
                .with_attached_deposit(1)
                .ft_transfer(user_account.clone(), U128(GEEBUCK_STARTING_AMOUNT)),
        );
        self.registered_users.insert(&user_account, &true);
    }

    pub fn check_registered(&self, user_account: AccountId) -> bool {
        let mut is_registered = self.registered_users.get(&user_account).unwrap_or(false);
        is_registered
    }
}
