canister="nft-staking-rentspace-backend"
aid="user1"  # Example aid 
points=1000 # Example value


dfx canister call $canister createUser '(record {name="Arjun Sharma"; email="jayshrma161@gmail.com"})'

dfx canister call $canister getUser

dfx canister call  $canister updateUserProfile '(record {name = null; email = opt "ee@gmail.com"})'

echo "---------all tokens for user----------"
dfx canister call $Canister getAllUserTokens "(\"${aid}\")"

echo "---------Claiming points for user----------"
dfx canister call $Canister claimPoints "( ${points} : nat )"



