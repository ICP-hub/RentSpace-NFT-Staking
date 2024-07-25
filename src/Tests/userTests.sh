canister="nft-staking-rentspace-backend"
aid="user1"  # Example aid 
points=1000  # Example value

echo "---------Creating new user----------"
dfx canister call $canister createUser '(record {name="Arjun Sharma"; email="jayshrma161@gmail.com"})'

echo "---------Getting user----------"
dfx canister call $canister getUser

echo "---------Updating user profile----------"
dfx canister call $canister updateUserProfile '(record {name = null; email = opt "ee@gmail.com"})'

echo "---------Getting all tokens for user----------"
dfx canister call $canister getAllUserTokens "(\"${aid}\")"

echo "---------Claiming points for user----------"
dfx canister call $canister claimPoints "( ${points} : nat )"
