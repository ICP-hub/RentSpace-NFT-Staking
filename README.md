# RentSpace NFT Staking Platform

Welcome to the RentSpace NFT Staking Platform! RentSpace offers versatile NFTs that can be staked, traded, and used to earn various rewards. Currently operating on the Internet Computer Protocol (ICP), our multichain approach will soon incorporate more blockchains, enhancing our dynamic ecosystem. These NFTs serve as key assets for both entertainment and the ability to earn real rewards.

## RentSpace Collections

RentSpace is excited to announce a planned series of five sequential NFT villa collections, each themed around different futuristic concepts and timed with key Technical Development Milestones as approved by the Dfinity Developer Grant team and the Solana Foundation. Each collection will contain NFTs categorized into five types of rarity: Common, Uncommon, Rare, Epic, and Legendary, offering escalating levels of exclusivity and benefits.

### Collection Overview

- **Minimalistic Villas (Modern days)**: This collection captures the essence of contemporary design with villas that blend modern aesthetics with functional living spaces.
- **Modernistic Villas (Next decade)**: Looking slightly ahead, this collection features cutting-edge designs that anticipate the architectural trends of the near future.
- **Futuristic Villas (2040s)**: These villas showcase radical architectural innovations and smart home technologies expected in the 2040s, offering a glimpse into a fully integrated future.
- **Moon Villas (2050s)**: As humanity expands its reach, these villas represent lunar living with designs suited for life on the Moon, combining Earthly comfort with space adaptability.
- **Mars Villas (2060s)**: The pinnacle of extraterrestrial luxury, these villas are designed for life on Mars, featuring environments that cater to the harsh Martian climate while providing an unmatched living experience.

## RentSpace Rarities

### Rarity Levels and Benefits

- **Common**: Provides basic access to the ecosystem, whitelist opportunities for future collections, and 1000 RentSpace Points.
- **Uncommon**: Features unique design elements, early access to subsequent collections, and 2000 RentSpace Points.
- **Rare**: Offers distinctive, sophisticated designs with priority access, enhanced community benefits, 3000 RentSpace Points, and eligibility for public token sales.
- **Epic**: Grants top-tier access privileges, exclusive community channels, special events participation, 5000 RentSpace Points, and access to private token sales.
- **Legendary**: Ensures the most exclusive benefits, including comprehensive access to all future NFT collections, unique community events, 10000 RentSpace Points, and private sales opportunities.

As these collections are released, each will bring a unique set of villas that reflect their era and thematic inspiration, enhancing their value and desirability within the RentSpace ecosystem.

For detailed information about each collection and the associated benefits, please visit our official [Medium page](https://medium.com/@rentspace/the-launch-of-rentspaces-second-nft-collection-modernistic-villas-0db4635956cf).

## Staking

### How the Staking System Works

RentSpace's website allows you to stake your NFTs and earn RentSpace points in return. Additionally, possessing the NFT itself grants you a fixed amount of points at the start, which corresponds to the uniqueness of the villa. You can stake any number of villas using villas from the corresponding period. There are a total of five collections and five corresponding worlds:

- Minimalistic World
- Modernistic World
- Futuristic World
- Moon World
- Mars World

For example, you can stake all your Minimalistic Villas only in Minimalistic World.

The basic staking percentage is 17% per month. RentSpace points are accrued every hour.

### Boosting Your Staking Rewards

The website also provides several additional methods to increase the farming speed:

- **Presence in each collection**:
  - One RentSpace World: +0%
  - Two RentSpace Worlds: +10%
  - Three RentSpace Worlds: +30%
  - Four RentSpace Worlds: +50%
  - Five RentSpace Worlds: +100%
  
  You can mix any worlds. The number of villas in them will not affect the boost.

- **Unique location in each world**: During specific periods, it will be possible to unlock an additional location in each world. Purchasing this location will cost a certain amount of points and will significantly boost point farming for several months.
- **Social media interaction**: You can share how you've populated the RentSpace worlds with your NFTs on Twitter. Doing so will earn you an additional 100 points.

The website features a dashboard that displays the hourly rate of RentSpace point farming, the total amount of coins farmed, and the staking period.

### Staking Conditions

- **Staking Fee**: None. It's free.
- **Locking Time**: The minimum staking period is set to 10 days, during which you cannot unstake. Following the 10 days you can unstake your NFTs at any time. During the staking period, you will earn RentSpace points.

## Source of Rewards

According to our tokenomics, we allocate 5% for rewards to our early community. The points earned on the platform can be exchanged for tokens of our project.

## Project Funding

The project is funded and created by RentSpace.

## Our Values

Our values are based on courtesy, kindness, and transparency. Our goal is to give our early community the opportunity to support us, for which we want to express our gratitude with well-earned rewards.

## RentSpace Holder Roles

Users who hold a significant number of our NFTs will also be rewarded with specific roles in our Discord, based on the number of villas they own:

- 1-5 villas
- 5-10 villas
- 10-15 villas
- 15-20 villas
- 25+ villas

## Setting Up Locally

To set up the RentSpace NFT Staking Platform locally, follow these steps:

1. Fork this repo.
2. Open the project in WSL and run: `dfx start --background`
3. Install dependencies: `npm i --force`
4. Pull and deploy dependencies:
   ```bash
   dfx deps pull
   dfx deps deploy
   ```
5. Deploy the project: `dfx deploy`
6. Start the application: `npm start`

### Setting up Local EXT Canister

8. Clone this repo: [NFT_STANDARD](https://github.com/ArjunQBTech/NFT_STANDARD)
9. Open this project in WSL and run: `dfx deploy`

### Changing Canister IDs
1. Open this file: `src/nft-staking-rentspace-backend/controllers/nftHandler.mo`
2. In line #51, change the `BackendCanisterId` to newly deployed backend canister ID.

`let BackendCanisterId = "<Newly deployed Canister ID>";`

3. Next, open the `src/Tests/canisterID.js` file, in line #6 & #7, in the case when production is false, change the canister ID to newly deployed canister ID. 

`EXT: production ? "m2nno-7aaaa-aaaah-adzba-cai" : "<Newly deployed Canister ID>",`
`NFT_BACKEND: production ? "yr432-oqaaa-aaaao-a3phq-cai" : "<Newly deployed Canister ID>"`

### Setting Up Local ICP Ledger

Refer to the [ICP Ledger Local Setup documentation](https://internetcomputer.org/docs/current/developer-docs/defi/icp-tokens/ledger-local-setup) for details.

### Backend functions

#Function to create a new user.
1. createUser(name,email)  -> {user,error}
  Usecase : a) First checks if user calling the functin is anonymous.
            b) Takes inputs of type userInput that has a name and an email.
            c) Returns an object of type User or an error.
  #End of createUser function


#Function to get all NFTs that are already staked by the user.
2. getAllStaked() -> [NFT]
  Usecase : Takes no parameters, Returns an array of type NFT.
  #End of getAllStaked function


#Function to get user details
3. getUser() {} -> {user,error}
  UseCase : Takes no parameters, returns an object of type user, or an error.
  #End of getUser function.

#Function to update user profile
4. updateUserProfile(newUserDetails) -> {Text, error}
  UseCase : a)Checks if caller is anonymous.
            b)Takes an object as parameter with the new email and new name.
            c)Returns a text if user updation is successful, or an error if failed.

  #End of updateUserProfile function

#Function to get all the user's points that are accumulated yet
5. getPointsAccumulated(nftId) -> {Number, error}
  Usecase : a)Takes a parameter nftId of type text.
            b)Returns the number of accumulated points if successful, or an error.

  #End of getPointsAccumulated function.


#Function to import user's all NFTs.
6. importNFTs([tokenData]) -> {Text, Text}
  Usecase:  a)Checks if caller is anonymous
            b) Takes tokenData as parameter, that is an array which has an object that has tid and metadata, both of type Text.
            c)Returns a successful or an error message.

  #End of importNFTs function.

#Function to get all the tokens that a user owns.
7.  getAllUserTokens(aid) -> {[tid, metadata], error}
  Usecase:  a)Takes aid as parameter, that is a text.
            b)Returns an array allTokenDetails, which contains an object tid and metadata both of type text.

  #End of getAllUserTokens function.

#Function go get all NFTs that a user owns.
8.  getUserNFTs() -> {[NFT.NFT], error}
  Usecase:  Takes no arguments and returns an array of type NFT or an error text.
  #End of getUserNFTs function.


#Function to get all the NFTs that have been imported by the user
9. getUserImportedNFTs() -> {[NFT.NFT], error}
  Usecase:  Takes no arguments and returns an array of type NFT or an error text.
  #End of getUserImportedNFTs function.


#Function to get all the NFTs that have been staked by the user
10. getUserStakedNFTs() -> {[NFT.NFT], error}
  Usecase:  Takes no arguments and returns an array of type NFT or an error text.
  #End of getUserStakedNFTs function

#Function to claim all Points that a user gets after UNSTAKING an NFT that was already STAKED.
11. claimPoints(points) -> {Text}
  Usecase:  a)Takes points as the only parameter, which is a number.
            b)Returns a text, both after successful operation, or if an error occurs.
  #End of claimPoints function.

#Function to stake a NFT.
12. stakeNFT(nftId) -> {Text}
  Usecase:  a)Checks if caller is anonymous.
            b)Takes nftId as parameter, which is of type Token Identifier.
            c)Returns an object containing a text, both in successful operation, or if an error occurs.
  #End of stakeNFT function

#Function to unstake a staked NFT.
13. unstakeNFT(nftId) -> {Text}
  Usecase:  a)Checks if user is anonymous.
            b)Takes nftId as parameter, which is of type Token Identifier.
            c)Returns an object containing a text, both in successful operation, or if an error occurs.
  #End of unstakeNFT function
    



