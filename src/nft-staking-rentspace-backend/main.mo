import UserHandler "controllers/userHandler";
import User "models/User";
import NFT "models/NFT";
import Functions "Utils";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Nat64 "mo:base/Nat64";
import Types "Types";
import NftHandler "controllers/nftHandler";
import EXT "./actors/EXT";
import ICRC "./actors/ICRC";

actor {
    stable var stableUserRecords : UserHandler.StableData = {
        users = [];
    };

    stable var stableNftRecords : NftHandler.StableData = {
        unstakedNFT = [];
        stakedNFT = [];
    };

    var userHandler = UserHandler.UserHandler(stableUserRecords);
    var nftHandler = NftHandler.NftHandler(stableNftRecords, userHandler);

    system func preupgrade() {
        stableUserRecords := userHandler.toStableData();
        stableNftRecords := nftHandler.toStableData();
    };

    system func postupgrade() {
        userHandler := UserHandler.UserHandler(stableUserRecords);
        nftHandler := NftHandler.NftHandler(stableNftRecords, userHandler);
    };

    public shared ({ caller }) func createUser(user : User.UserInput) : async Result.Result<Text, UserHandler.InvalidError> {
        await Functions.checkAnonymous(caller);
        let newUser = userHandler.createUser(user, caller);
        switch (newUser) {
            case (#ok(user)) {
                return #ok("User created successfully");
            };
            case (#err(error)) {
                return #err(error);
            };
        };
    };

    public shared query ({ caller }) func getUser() : async Types.GetUserResult {
        let user = userHandler.get(caller);
        switch (user) {
            case (?user) {
                return #ok(user);
            };
            case (null) {
                return #err(#notFound);
            };
        };
    };

    public shared ({ caller }) func updateUserProfile(_newUserData : { name : ?Text; email : ?Text }) : async Result.Result<Text, Types.UpdateUserError> {
        await Functions.checkAnonymous(caller);
        let updatedUserProfile = userHandler.updateUserProfile(caller, _newUserData);
        switch (updatedUserProfile) {
            case (#ok(user)) {
                return #ok("User updated successfully");
            };
            case (#err(error)) {
                return #err(error);
            };
        };
    };

    public shared ({ caller }) func importNFTs(aid : Text) : async Result.Result<Text, Text> {
        await Functions.checkAnonymous(caller);
        let importedNFTs = await nftHandler.importNFTs(aid, caller);
        switch (importedNFTs) {
            case (#ok(nfts)) {
                return #ok("NFTs imported successfully : " # nfts);
            };
            case (#err(error)) {
                return #err(error);
            };
        };
    };

    public shared ({ caller }) func getAllUserTokens(aid : Text) : async Result.Result<[{tid : Text; metadata : Text}], Text> {
        let allTokens = await nftHandler.getAllUserNFTs(aid, caller);

        switch allTokens {
            case (#ok(tokens)) {
                let allTokensDetails = await nftHandler.getTokensById(tokens);
                return #ok(allTokensDetails);
            };
            case(#err(err)) {
                return #err(err);
            };
        };
    };

    public shared query ({ caller }) func getUserNFTs() : async Result.Result<[?NFT.NFT], Text> {
        try {
            // await Functions.checkAnonymous(caller);
            // Check anonymous user
            let userImportedNfts = nftHandler.getAllUserImportedNfts(caller);
            let importedNFTId = Buffer.fromArray<Text>(userImportedNfts);

            let userStakedNfts = nftHandler.getAllUserStakedNfts(caller);
            let stakedNFTId : Buffer.Buffer<Text> = Buffer.fromArray<Text>(userStakedNfts);
            importedNFTId.append(stakedNFTId);
            let allUserNFTsArray = Buffer.toArray(importedNFTId);
            let allUserNFTsDetails : [?NFT.NFT] = Iter.fromArray(allUserNFTsArray)
            |> Iter.map(_, nftHandler.getUnstaked)
            |> Iter.toArray(_);
            return #ok(allUserNFTsDetails);
        } catch (err) {
            return #err(Error.message(err));
        };
    };

    public shared query ({ caller }) func getUserImportedNFTs() : async Result.Result<[?NFT.NFT], Text> {
        try {
            // Check anonymous user
            let userImportedNfts = nftHandler.getAllUserImportedNfts(caller);

            let nftDetails : [?NFT.NFT] = Iter.fromArray(userImportedNfts)
            |> Iter.map(_, nftHandler.getUnstaked)
            |> Iter.toArray(_);

            return #ok(nftDetails);

        } catch (err) {
            return #err(Error.message(err));
        };
    };

    public shared query ({ caller }) func getUserStakedNFTs() : async Result.Result<[?NFT.NFT], Text> {
        try {
            let userStakedNfts = nftHandler.getAllUserStakedNfts(caller);
            let nftDetails = Iter.fromArray(userStakedNfts)
            |> Iter.map(_, nftHandler.getStaked)
            |> Iter.toArray(_);

            return #ok(nftDetails);
        } catch (err) {
            return #err(Error.message(err));
        };
    };

    public shared ({ caller }) func claimPoints(points : Nat) : async Result.Result<Text, Text> {
        await Functions.checkAnonymous(caller);
        let ICRCCanisterId = "ryjl3-tyaaa-aaaaa-aaaba-cai";
        let ICRCACTOR = actor (ICRCCanisterId) : ICRC.Token;

        let userData = userHandler.get(caller);

        switch (userData) {
            case (null) {
                return #err("User does not Exist");
            };
            case (?user) {
                let transferRequest : ICRC.TransferArg = {
                    amount = Functions.convertPointsToICP(points);
                    memo = null;
                    fee = ?10000;
                    from_subaccount = null;
                    to = { owner = caller; subaccount = null };
                    created_at_time = ?Nat64.fromIntWrap(Time.now());
                };

                let transferResponse : ICRC.Icrc1TransferResult = await ICRCACTOR.icrc1_transfer(transferRequest);

                switch transferResponse {
                    case (#Ok(_)) {
                        let updatedPoints = user.rewardPoints - points;
                        let updateUserPointsRequest = userHandler.updatePoints(caller, updatedPoints);

                        switch updateUserPointsRequest {
                            case (#ok) {
                                return #ok("Points claimed Successfully");
                            };
                            case (#err(#Unauthorized)) {
                                return #err("Error Claiming Points : Unauthorized");
                            };
                        };
                    };
                    case (#Err(err)) {
                        switch (err) {
                            case (#GenericError(e)) {
                                return #err("Error in claimin points : " # e.message);
                            };
                            case (#TemporarilyUnavailable) {
                                return #err("Temporarily unavailable");
                            };
                            case (#BadBurn(e)) {
                                return #err("Bad burn : ");
                            };
                            case (#Duplicate(e)) {
                                return #err("Duplicate : ");
                            };
                            case (#BadFee(e)) {
                                return #err("Bad fee : ");
                            };
                            case (#CreatedInFuture(e)) {
                                return #err("Created in future : ");
                            };
                            case (#TooOld) {
                                return #err("Too old");
                            };
                            case (#InsufficientFunds(e)) {
                                return #err("Insufficient funds : ");
                            };
                        };
                    };
                };

            };
        };
    };

    public shared ({ caller }) func stakeNFT(nftId : EXT.TokenIdentifier) : async Result.Result<Text, Text> {
        await Functions.checkAnonymous(caller);
        let stakedNFT = await nftHandler.stakeNFT(nftId, caller);
        switch (stakedNFT) {
            case (#ok(nft)) {
                return #ok("NFT staked successfully : " # nft);
            };
            case (#err(err)) {
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
        };
    };

    public shared ({ caller }) func unstakeNFT(nftId : EXT.TokenIdentifier) : async Result.Result<Text, Text> {
        await Functions.checkAnonymous(caller);
        let unstakedNFT = await nftHandler.unstakeNFT(nftId, caller);
        switch (unstakedNFT) {
            case (#ok(nft)) {
                return #ok("NFT unstaked successfully : " # nft);
            };
            case (#err(err)) {
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
        };
    };
};
