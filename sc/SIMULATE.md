```bash
# go to geegee/sc folder
cd sc

# deploy ft token
npm run deploy:ft

# export geebuck address
export GEEBUCK=dev-1660899460041-91364324305746

# deploy geebuck token
near call $GEEBUCK new '{"owner_id": "'$GEEBUCK'", "total_supply": "1000000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "GeeBuck Token", "symbol": "GBK", "decimals": 9 }}' --accountId $GEEBUCK

# (checking) get fungible token metadata
near view $GEEBUCK ft_metadata

# (checking) check total supply ( = balance of geebuck) is 10^9 : 1_000_000_000_000_000_000 (decimal 9 => 10^18)
near view $GEEBUCK ft_balance_of '{"account_id": "'$GEEBUCK'"}'

##################    geegee    #################

# deploy geegee contract
npm run deploy:geegee

# export geegee address
export GEEGEE=dev-1660899619275-70957694153184

# initialize geegee contract
near call $GEEGEE new '{"geebuck_account_id": "'$GEEBUCK'"}' --accountId $GEEGEE --amount 0.01

# deposit 10^8 geebuck
near call $GEEBUCK ft_transfer '{"receiver_id": "'$GEEGEE'", "amount": "100000000000000000"}' --accountId $GEEBUCK --amount 0.000000000000000000000001

# export test_user
export TEST_USER=testuser

# register user to geegee
near call $GEEGEE register_user '{"user_id": "'$TEST_USER'"}' --accountId $GEEGEE --amount 0.001000000000000000000002

# (check ing) get user's geebuck balance is 50
near view $GEEBUCK ft_balance_of '{"account_id": "'$TEST_USER'.'$GEEGEE'"}'

```
