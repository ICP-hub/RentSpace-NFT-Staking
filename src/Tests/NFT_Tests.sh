canister="nft-staking-rentspace-backend"
account_id=$(dfx ledger account-id | grep -oP '(?<=\")(.*?)(?=\")')
nftID="hakfb-pqkor-uwjaa-aaaaa-aeaaa-eaqca-aaaag-a"   # Example nftID, we can change it 
tokenData="c5822914fbb69c6c0fd4e5d0f3d8f0ad8ef78bc27384965009a3f97f39436294"  # Example tokenData, we can change it 

echo "'${account_id}'"

echo "---------Getting all staked NFTs----------"
dfx canister call $canister getAllStaked

echo "---------Getting points accumulated----------"
dfx canister call $canister getPointsAccumulated "(\"${nftID}\")"

echo "---------Importing NFTs----------"
dfx canister call $canister importNFTs "(${tokenData})"

echo "---------Getting User NFTs----------"
dfx canister call $canister getUserNFTs

echo "---------Getting imported NFTs for user----------"
dfx canister call $canister getUserImportedNFTs

echo "---------Getting staked NFTs for user----------"
dfx canister call $canister getUserStakedNFTs

echo "---------Staking NFT for user----------"
dfx canister call $canister stakeNFT "(\"${nftID}\")"

echo "---------Unstaking NFT for user----------"
dfx canister call $canister unstakeNFT "(\"${nftID}\")"


