import UserModel "models/userModel";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Error "mo:base/Error";
import TrieMap "mo:base/TrieMap";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Nat32 "mo:base/Nat32";
import Functions "utils/functions";
import NftModel "models/nftModel";
import EXT "EXT";
import Utils "utils/functions";
import TokenIdentifier "utils/tokenIdentifier";

actor {
  var userRecords = TrieMap.TrieMap<Principal, UserModel.User>(Principal.equal, Principal.hash);
  stable var stableUserRecords : [(Principal, UserModel.User)] = [];

  var importedNftRecords = TrieMap.TrieMap<Text, NftModel.ImportedNFT>(Text.equal, Text.hash);
  stable var stableImportedNFTRecords : [(Text, NftModel.ImportedNFT)] = [];

  var stakedNftRecords = TrieMap.TrieMap<Text, NftModel.StakedNFT>(Text.equal, Text.hash);
  stable var stableStakedNFTRecords : [(Text, NftModel.StakedNFT)] = [];

  var EXTCanisterId = "be2us-64aaa-aaaaa-qaabq-cai";
  let EXTActor = actor (EXTCanisterId) : EXT.erc721_token;

  system func preupgrade() {
    stableUserRecords := Iter.toArray(userRecords.entries());
    stableImportedNFTRecords := Iter.toArray(importedNftRecords.entries());
    stableStakedNFTRecords := Iter.toArray(stakedNftRecords.entries());
  };

  system func postupgrade() {
    let userRecordVals = stableUserRecords.vals();
    let importedNFTRecordVals = stableImportedNFTRecords.vals();
    let stakedNFTRecordVals = stableStakedNFTRecords.vals();

    userRecords := TrieMap.fromEntries<Principal, UserModel.User>(userRecordVals, Principal.equal, Principal.hash);
    importedNftRecords := TrieMap.fromEntries<Text, NftModel.ImportedNFT>(importedNFTRecordVals, Text.equal, Text.hash);
    stakedNftRecords := TrieMap.fromEntries<Text, NftModel.StakedNFT>(stakedNFTRecordVals, Text.equal, Text.hash);

    stableUserRecords := [];
    stableImportedNFTRecords := [];
    stableStakedNFTRecords := [];
  };

  // to do -->

  // 1. user creation Function d t
  // 2. user details get Functions d t
  // 3. import nft function d t
  // 4. stake imported nfts d t
  // 5. list all the staked nfts with pagination d t
  // 6. list nft imported by a user d t
  // 7. list nft staked by user d t
  // 8. Get NFT details for imported NFTs d t
  // 9. Get NFT details for staked NFTs d t
  // 10. unstake a specific NFT d t
  // 11. calculate reward d t
  // 12. Add DIP721 in staking and unstaking

  //Create new user
  public shared ({ caller }) func createNewUser(_userdata : UserModel.UserInputData) : async Result.Result<Text, Text> {
    try {
      await Functions.checkAnonymous(caller);
      let newUser : UserModel.User = {
        id = caller;
        name = _userdata.name;
        email = _userdata.email;
        importedNFTs = [];
        stakedNFTs = [];
        rewardPoints = 0;
      };
      userRecords.put(caller, newUser);
      return #ok(newUser.name # " successfully registered!");

    } catch e {
      return #err(Error.message(e));
    };
  };

  // Get existing user data
  public shared ({ caller }) func getUserData() : async Result.Result<UserModel.User, Text> {
    try {
      await Functions.checkAnonymous(caller);
      switch (userRecords.get(caller)) {
        case (null) {
          return #err("No user data found for this principal");
        };
        case (?value) {
          return #ok(value);
        };
      };
    } catch e {
      return #err(Error.message(e));
    };
  };

  // Import New NFTs
  public shared ({ caller }) func importNewNFT(aid : Text) : async Result.Result<Text, Text> {
    try {
      var metadataExample : Text = "";
      await Functions.checkAnonymous(caller);
      // Use Account Identifier
      let tokensResponse = await EXTActor.tokens(aid);
      switch (tokensResponse) {
        case (#err(err)) {
          return #err("Failed to retrieve tokens ");
        };
        case (#ok(tokenIds)) {
          if (tokenIds.size() == 0) {
            return #err("No NFTs found for the caller.");
          };

          // Get metadata for all NFTs
          let metadataResponse = await EXTActor.getTokensByIds(tokenIds); // For testing purpose
          var importedCount = 0; // For testing purpose

          for ((tokenId, metadata) in Iter.fromArray(metadataResponse)) {
            // Check if the NFT is already imported
            switch (importedNftRecords.get(Nat32.toText(tokenId))) {
              case (?_) {
                // If already imported, skip to next token
                Debug.print(debug_show ("NFT already imported: " # Nat32.toText(tokenId)));
              };
              case (null) {

              };
            };

            // Update user records
            switch (userRecords.get(caller)) {
              case (null) {
                return #err("User not found.");
              };
              case (?user) {
                // Check if the NFT is already imported
                // If Exist then put in importedNftRecords
                // Else Don't put throw err
                switch (await getImportedNFTDetails(Nat32.toText(tokenId))) {
                  case (#ok(nfts)) {
                    return #err("NFT already imported");
                  };
                  case (#err(err)) {
                    // Continue
                  };
                };
                // Create and store the ImportedNFT
                let newImportedNFT : NftModel.ImportedNFT = {
                  id = Nat32.toText(tokenId);
                  metadata = Utils.serializeMetadata(metadata);
                  owner = caller;
                  isStaked = false;
                  canisterID = EXTCanisterId;
                };

                if (metadataExample == "") {
                  metadataExample := newImportedNFT.metadata;
                };

                let newImportedNFTList : Buffer.Buffer<Text> = Buffer.fromArray(user.importedNFTs);
                newImportedNFTList.add(newImportedNFT.id);

                // Creating new user data
                let newUserData : UserModel.User = {
                  id = user.id;
                  stakedNFTs = user.stakedNFTs;
                  name = user.name;
                  email = user.email;
                  rewardPoints = user.rewardPoints;
                  importedNFTs = Buffer.toArray(newImportedNFTList);
                };

                userRecords.put(caller, newUserData);
                importedNftRecords.put(newImportedNFT.id, newImportedNFT);

                importedCount += 1;
              };
            };
          };
          if (importedCount == 0) {
            return #err("No new NFTs were imported.");
          };
          return #ok("Successfully imported " # Nat.toText(importedCount) # " NFTs." # metadataExample);
        };

      };
    } catch e {
      return #err(Error.message(e));
    };
  };

  //Stake imported NFTs
  public shared ({ caller }) func stakeNFT(nftID : EXT.TokenIdentifier) : async Result.Result<Text, Text> {
    try {
      await Functions.checkAnonymous(caller);
      let idx : Nat = Nat32.toNat(TokenIdentifier.getIndex(nftID));
      let _nftID : Text = Nat.toText(idx);
      switch (importedNftRecords.get(_nftID)) {
        case (?value) {
          if (value.owner == caller) {
            switch (userRecords.get(caller)) {
              case (null) {
                return #err("Owner of this NFT does not exist in records!");
              };
              case (?owner) {
                // Staking the NFT
                switch (stakedNftRecords.get(_nftID)) {
                  case (?_) {
                    return #err("NFT already staked!");
                  };
                  case (null) {};
                };
                // // Make Transfer Request
                let CanisterPrincipal = Principal.fromText(EXTCanisterId);

                let transferRequest : EXT.TransferRequest = {
                  to = #principal CanisterPrincipal;
                  token = nftID;
                  notify = false;
                  from = #principal caller;
                  memo = "Stake NFT";
                  amount = 1;
                  subaccount = null;
                };
                let transferResponse = await EXTActor.transfer(transferRequest);
                switch (transferResponse) {
                  case (#err(err)) {
                    // Print the specific error
                    switch (err) {
                      case (#Unauthorized(tokenID)) {
                        return #err("Unauthorized to transfer NFT : " # tokenID);
                      };
                      case (#InsufficientBalance(balance)) {
                        return #err("Insufficient balance to transfer NFT : ");
                      };
                      case (#Rejected) {
                        return #err("Transfer request rejected : ");
                      };
                      case (#InvalidToken(tokenID)) {
                        return #err("Invalid token ID : " # tokenID);
                      };
                      case (#CannotNotify(aid)) {
                        return #err("Cannot notify the receiver");
                      };
                      case (#Other(e)) {
                        return #err("Other error : " # e);
                      };
                    };
                  };
                  case (#ok(_)) {
                    let newStakedNFT : NftModel.StakedNFT = {
                      id = _nftID;
                      metadata = value.metadata;
                      owner = caller;
                      canisterID = value.canisterID;
                      stakedAt = Time.now();
                    };
                    let newImportedNFT : NftModel.ImportedNFT = {
                      id = _nftID;
                      metadata = value.metadata;
                      owner = caller;
                      canisterID = value.canisterID;
                      isStaked = true;
                    };
                    var newStakedNFTList : Buffer.Buffer<Text> = Buffer.fromArray(owner.stakedNFTs);
                    newStakedNFTList.add(_nftID);
                    let newUserData : UserModel.User = {
                      id = owner.id;
                      email = owner.email;
                      importedNFTs = owner.importedNFTs;
                      rewardPoints = owner.rewardPoints;
                      name = owner.name;
                      stakedNFTs = Buffer.toArray(newStakedNFTList);
                    };
                    userRecords.put(caller, newUserData);
                    stakedNftRecords.put(_nftID, newStakedNFT);
                    ignore importedNftRecords.replace(_nftID, newImportedNFT);
                    return #ok("Your NFT is staked now!");
                  };
                };
              };
            };
          } else {
            return #err("You are not the owner of this NFT!");
          };
        };
        case (null) {
          return #err("No NFT found with this ID!");
        };
      };
    } catch e {
      return #err(Error.message(e));
    };
  };

  //   public shared ({caller}) func stakeNFT(_nftID : Text) : async Result.Result<Text, Text> {
  //     try {
  //       await Functions.checkAnonymous(caller);
  //       let importedNfts = await getAllUserImportedNFTDetails(_nftID);  // Get All NFTs owned by User
  //       switch (importedNfts) {
  //         case(#ok(nft)) {
  //           let nftExists = Array.filter<Text>(nft, func nft=nft==_nftID);  // Check if NFT exists in User's Imported NFTs
  //           if(nftExists.size() == 0) {
  //             return #err("NFT not found in User's Imported NFTs");
  //           } else {
  //             let stakedNfts = await getAllUserStakedNFTs();  // Get All NFTs staked by User
  //             let stakedNftExists = Array.filter<Text>(stakedNfts, func nft=nft==_nftID);  // Check if NFT exists in User's Staked NFTs
  //             if(stakedNftExists.size() > 0) {
  //               return #err("NFT already staked by User");
  //             } else {
  //               // let stakeTransferRequest : EXT.TransferRequest = {
  //               //   to = EXTCanisterId;
  //               //   tokenId = Nat32.fromText(_nftID);
  //               //   notify = false;
  //               //   from = "3565436e7e9de384f9cf00e686632bdb313eacee3307cea899044d366ed5ae80";
  //               //   memo = "Stake NFT";
  //               //   amount =
  //               // }
  //             }
  //           }
  //         };
  //         case(#err(err)) {
  //           return #err(err);
  //         };
  //       }
  //     } catch e {
  //       return #err(Error.message(e));
  //     };
  // };
  // get all the staked NFTs by a user
  public shared ({ caller }) func getAllUserStakedNFTs() : async Result.Result<[Text], Text> {
    switch (userRecords.get(caller)) {
      case (null) {
        return #err("No user found with this ID");
      };
      case (?user) {
        return #ok(user.stakedNFTs);
      };
    };
  };
  // get all the imported NFTs by a user
  public shared ({ caller }) func getAllUserImportedNFTs() : async Result.Result<[Text], Text> {
    switch (userRecords.get(caller)) {
      case (null) {
        return #err("No user found with this ID");
      };
      case (?user) {
        return #ok(user.importedNFTs);
      };
    };
  };
  // Get details of an imported NFT
  public func getImportedNFTDetails(_nftID : Text) : async Result.Result<NftModel.ImportedNFT, Text> {
    switch (importedNftRecords.get(_nftID)) {
      case (null) {
        return #err("No NFT is imported with this ID");
      };
      case (?value) {
        return #ok(value);
      };
    };
  };
  // Get details of a Staked NFT
  public func getStakedNFTDetails(_nftID : Text) : async Result.Result<NftModel.StakedNFT, Text> {
    switch (stakedNftRecords.get(_nftID)) {
      case (null) {
        return #err("No NFT staked with given ID");
      };
      case (?value) {
        return #ok(value);
      };
    };
  };
  // List all the staked NFTs with pagination
  public func getAllStakedNFTs(_pageNo : Nat, _pageSize : Nat) : async Result.Result<[(Text, NftModel.StakedNFT)], Text> {
    try {
      let nftIter = stakedNftRecords.entries();
      let nftArr = Iter.toArray(nftIter);
      Debug.print(debug_show (nftArr));
      if (_pageNo < 1) {
        return #err("Page number starts from 1");
      };
      let startIndex = (_pageNo - 1) * 10;
      var endIndex = startIndex +_pageSize;
      Debug.print(debug_show (endIndex));

      if (startIndex >= nftArr.size()) {
        return #err("page number exceeds the number of entries");
      };
      if (endIndex > nftArr.size()) {
        endIndex := nftArr.size();
      };
      Debug.print(debug_show (startIndex));
      Debug.print(debug_show (endIndex));
      let filteredNFTListings = Iter.toArray(Array.slice(nftArr, startIndex, endIndex));
      return #ok(filteredNFTListings);
    } catch e {
      return #err(Error.message(e));
    };
  };
  // Un-staking an NFT
  public shared ({ caller }) func unstakeNFT(nftID : EXT.TokenIdentifier) : async Result.Result<Text, Text> {
    try {
      await Functions.checkAnonymous(caller);
      let _nftID = Nat.toText(Nat32.toNat(TokenIdentifier.getIndex(nftID)));
      switch (userRecords.get(caller)) {
        case (null) {
          return #err("You are not a valid user!");
        };
        case (?user) {
          switch (stakedNftRecords.get(_nftID)) {
            case (null) {
              return #err("No staked NFT found for this ID " # _nftID);
            };
            case (?nft) {
              if (nft.owner != caller) {
                return #err("You are not the owner of the staked NFT !");
              };

              let CanisterPrincipal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");

              // Transfer NFT back to the owner
              let transferRequest : EXT.TransferRequest = {
                to = #principal caller;
                token = nftID;
                notify = false;
                from = #principal CanisterPrincipal;
                memo = "UnStake NFT";
                amount = 1;
                subaccount = null;
              };
              let transferResponse = await EXTActor.transfer(transferRequest);

              switch (transferResponse) {
                case (#err(err)) {
                  // Print the specific error
                  switch (err) {
                    case (#Unauthorized(tokenID)) {
                      return #err("Unauthorized to transfer NFT : " # tokenID);
                    };
                    case (#InsufficientBalance(balance)) {
                      return #err("Insufficient balance to transfer NFT : ");
                    };
                    case (#Rejected) {
                      return #err("Transfer request rejected : ");
                    };
                    case (#InvalidToken(tokenID)) {
                      return #err("Invalid token ID : " # tokenID);
                    };
                    case (#CannotNotify(aid)) {
                      return #err("Cannot notify the receiver");
                    };
                    case (#Other(e)) {
                      return #err("Other error : " # e);
                    };
                  };
                };
                case (#ok(_)) {
                  let updatedStakedNFTs : Buffer.Buffer<Text> = Buffer.fromArray(user.stakedNFTs);
                  var removeIndex = 0;
                  switch (Buffer.indexOf(_nftID, updatedStakedNFTs, Text.equal)) {
                    case (null) {
                      return #err("No staked NFT with this ID owner by you");
                    };
                    case (?value) {
                      removeIndex := value;
                    };
                  };
                  ignore updatedStakedNFTs.remove(removeIndex);
                  let updatedUser : UserModel.User = {
                    id = caller;
                    name = user.name;
                    email = user.email;
                    importedNFTs = user.importedNFTs;
                    stakedNFTs = Buffer.toArray(updatedStakedNFTs);
                    rewardPoints = user.rewardPoints +(await Functions.calculateReward(nft.stakedAt));
                  };
                  ignore userRecords.replace(caller, updatedUser);
                  stakedNftRecords.delete(_nftID);
                  return #ok("NFT successfully unstaked !");
                };
              };

            };
          };
        };
      };
    } catch e {
      return #err(Error.message(e));
    };
  };

  private func updateNFTs(_nftID : Text) : () {
    switch (importedNftRecords.get(_nftID)) {
      case (?value) {
        let newImportedNFT : NftModel.ImportedNFT = {
          id = value.id;
          metadata = value.metadata;
          owner = value.owner;
          isStaked = true;
          canisterID = value.canisterID;
        };
        ignore importedNftRecords.replace(_nftID, newImportedNFT);
      };
      case (null) {
        Debug.print(debug_show ("No NFT found with this ID"));
      };
    };
  };
};
