# Project Requirements

This project entails multiple milestones to be completed. For this first milestone we required the following smart-contracts to be developed in RUST with support for the NEAR blockchain.

## GeeBuck Token

The GeeBuck (GBK) is the native token for the GeeGee ecosystem. The token will be available on the NEAR blockchain.
We expect the token to have the fullowing functionalities:

- Max Supply: 1'000'000'000 (1 billion)
- ID: GBK
- Transferable (only within the GeeGee ecosystem)
- Burnable
- Pausable

## Ecosystem Reward Smart Contract

This smart contract will hold a total sum of 100'000'000 GBK token for distribution to Members.
It will send 50 GBK to every new member that has been placed to the white-list contract

## Whitelist Smart Contract

Every new user that has joined the GeeGee ecosystem will be added to the White-list with the following status:
New Member =
Verified Member =

# Script

## Deployed addresses

GeeBuck: dev-1661427088306-86049475331362
GeeGee: dev-1661427183626-42812063511585

## Deploy Script

### Deploy GeeBuck

```bash
# step 1. deploy ft contract
npm run deploy:ft

# step 2. export GeeBuck address,
export GEEBUCK=<address from './contract-ft/neardev/dev-account'>

# step 3. deploy geebuck token
near call $GEEBUCK new '{"owner_id": "'$GEEBUCK'", "total_supply": "1000000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "GeeBuck Token", "symbol": "GBK", "decimals": 9 }}' --accountId $GEEBUCK

# step 4. get fungible token metadata
near view $GEEBUCK ft_metadata
```

### Play with GeeBuck (This step is not neccessary actually, just for testing)

```bash
near view $GEEBUCK ft_balance_of '{"account_id": "'$GEEBUCK'"}'

near login # to login with $ACCOUNT_ID on browser

near call $GEEBUCK storage_deposit '' --accountId '$ACCOUNT_ID' --amount 0.00125

near call $GEEBUCK ft_transfer '{"receiver_id": "'$ACCOUNT_ID'", "amount": "10000000000"}' --accountId $GEEBUCK --amount 0.000000000000000000000001

near view $GEEBUCK ft_balance_of '{"account_id": "'$ACCOUNT_ID'"}'
```

### Deploy GeeGee

```bash
# step 1. deploy GeeGee contract
npm run deploy:geegee

# step 2. export GeeGee address
export GEEGEE=<address from './contract-geegee/neardev/dev-account'>

# step 3. initialize GeeGee
near call $GEEGEE new '{"geebuck_account_id": "'$GEEBUCK'"}' --accountId $GEEGEE --amount 0.01

# step 4, initial deposit GeeBuck to GeeGee
near call $GEEBUCK ft_transfer '{"receiver_id": "'$GEEGEE'", "amount": "100000000000000000"}' --accountId $GEEBUCK --amount 0.000000000000000000000001
```

### Play with GeeGee (This step is not neccessary actually, just for testing)

```bash
export TEST_USER=testuser

# This should return false
near view $GEEGEE check_registered '{"user_account": "'$TEST_USER'"}'

near call $GEEGEE register_account '{"user_account": "'$TEST_USER'"}' --accountId $GEEGEE --amount 0.009000000000000000000002

near view $GEEBUCK ft_balance_of '{"account_id": "'$TEST_USER'"}'

# This should return true
near view $GEEGEE check_registered '{"user_account": "'$TEST_USER'"}'
```
