canister="nft-staking-rentspace-backend"
account_id=$(dfx ledger account-id | grep -oP '(?<=\")(.*?)(?=\")')

echo "'${account_id}'"

dfx canister call $canister importNFTs '("c5822914fbb69c6c0fd4e5d0f3d8f0ad8ef78bc27384965009a3f97f39436294")'

dfx canister call $canister getUserNFTs

dfx canister call $canister stakeNFT '("hakfb-pqkor-uwjaa-aaaaa-aeaaa-eaqca-aaaag-a")'