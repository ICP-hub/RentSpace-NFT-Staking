canister="nft-staking-rentspace-backend"

dfx canister call $canister createUser '(record {name="Arjun Sharma"; email="jayshrma161@gmail.com"})'

dfx canister call $canister getUser

dfx canister call $canister updateUserProfile '(record {email= opt "ee@gmail.com"})'

