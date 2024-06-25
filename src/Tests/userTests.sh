
# Canister="nft-staking-rentspace-backend"
# name="user1"
# email="random@gmail.com"
# pageNumber=1
# pageSize=10



echo "---------Creating new user----------"
dfx canister call nft-staking-rentspace-backend createNewUser '(record {
     name="'user1'";
     email="'abc@gmail.com'";
})'


echo "---------Getting user data----------"
dfx canister call nft-staking-rentspace-backend  getUserData


echo "---------Listing all imported NFTs by user----------"
dfx canister call nft-staking-rentspace-backend getAllUserImportedNFTs


echo "---------Listing all staked NFTs by user----------"
dfx canister call nft-staking-rentspace-backend getAllUserStakedNFTs