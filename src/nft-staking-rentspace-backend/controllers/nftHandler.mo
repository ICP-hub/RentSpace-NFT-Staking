import Nft "../models/NFT";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Nat32 "mo:base/Nat32";
import EXT "../actors/EXT";
import Functions "../Utils";
import UserHandler "userHandler";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
import TokenIdentifier "../utils/tokenIdentifier";

module {
    public type Nft = Nft.NFT;
    public type Rarity = Nft.Rarity;

    type MutableNFT = {
        id : Text;
        var owner : Principal;
        var isStaked : Bool;
        rarity : Rarity;
        canisterID : Text;
        var stakedAt : ?Int;
        metadata : Text;
    };

    public type StableData = {
        unstakedNFT : [Nft];
        stakedNFT : [Nft];
    };

    type TransferError = {
        #CannotNotify : EXT.AccountIdentifier;
        #InsufficientBalance;
        #InvalidToken : EXT.TokenIdentifier;
        #Rejected;
        #Unauthorized : EXT.AccountIdentifier;
        #Other : Text;
    };

    public class NftHandler(nftData : StableData, userHandler : UserHandler.UserHandler) {

        let EXTCanisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
        let BackendCanisterId = "bd3sg-teaaa-aaaaa-qaaba-cai";
        let EXTActor = actor (EXTCanisterId) : EXT.erc721_token;

        private func toMutableNFT(nft : Nft) : MutableNFT {
            {
                id = nft.id;
                var owner = nft.owner;
                var isStaked = nft.isStaked;
                rarity = nft.rarity;
                canisterID = nft.canisterID;
                var stakedAt = nft.stakedAt;
                metadata = nft.metadata;
            };
        };

        private func buildNftMap(nfts : [Nft]) : TrieMap.TrieMap<Text, MutableNFT> {
            nfts.vals()
            |> Iter.map(_, toMutableNFT)
            |> Iter.map<MutableNFT, (Text, MutableNFT)>(
                _,
                func(p : MutableNFT) : (Text, MutableNFT) {
                    return (p.id, p);
                },
            )
            |> TrieMap.fromEntries(_, Text.equal, Text.hash);
        };

        let nftRecords : TrieMap.TrieMap<Text, MutableNFT> = buildNftMap(nftData.unstakedNFT);
        let stakedNftRecords : TrieMap.TrieMap<Text, MutableNFT> = buildNftMap(nftData.stakedNFT);

        public func toStableData() : StableData {
            {
                unstakedNFT = nftRecords.vals() |> Iter.map(_, fromMutableNFT) |> Iter.toArray(_);
                stakedNFT = stakedNftRecords.vals() |> Iter.map(_, fromMutableNFT) |> Iter.toArray(_);
            };
        };

        public func getUnstaked(id : Text) : ?Nft {
            let ?nft = nftRecords.get(id) else return null;
            ?fromMutableNFT(nft);
        };

        public func getAllStaked() : [Nft] {
            stakedNftRecords.vals()
            |> Iter.map(_, fromMutableNFT)
            |> Iter.toArray(_);
        };

        public func getStaked(id : Text) : ?Nft {
            let ?nft = stakedNftRecords.get(id) else return null;
            ?fromMutableNFT(nft);
        };

        public func getAllUserImportedNfts(userId : Principal) : [Text] {
            switch (userHandler.get(userId)) {
                case (?user) {
                    let userImportedNfts : [Text] = user.importedNFTs;
                    return userImportedNfts;
                };
                case (null) {
                    return [];
                };
            };
        };

        public func addNFT(tokenId : Text, token : MutableNFT) {
            nftRecords.put(tokenId, token);
        };

        public func getAllUserStakedNfts(userId : Principal) : [Text] {
            switch (userHandler.get(userId)) {
                case (?user) {
                    let userStakedNfts = user.stakedNFTs;
                    return userStakedNfts;
                };
                case (null) {
                    return [];
                };
            };
        };

        public func getAll() : [Nft] {
            nftRecords.vals()
            |> Iter.map(_, fromMutableNFT)
            |> Iter.toArray(_);
        };

        public func getAllUserNFTs(aid : Text, id : Principal) : async Result.Result<[EXT.TokenIndex], Text> {
            await Functions.checkAnonymous(id);
            let tokenResponse = await getNFTFromEXT(aid);
            switch tokenResponse {
                case (#ok(tokens)) {
                    return #ok(tokens);
                };
                case (#err(err)) {
                    switch (err) {
                        case (#InvalidToken(tokenId)) {
                            return #err("Invalid Token" # tokenId);
                        };
                        case (#Other(msg)) {
                            return #err("Other " #msg);
                        };
                    };
                };
            };
        };

        public func getTokensById(tokens : [EXT.TokenIndex]) : async [{
            tid : Text;
            metadata : Text;
        }] {
            let nftList = await EXTActor.getTokensByIds(tokens);

            return Array.map<(EXT.TokenIndex, EXT.Metadata), { tid : Text; metadata : Text }>(
                nftList,
                func((tid, metadata)) : { tid : Text; metadata : Text } {
                    let nftObj : { tid : Text; metadata : Text } = {
                        tid = Nat32.toText(tid);
                        metadata = Functions.serializeMetadata(metadata);
                    };
                    return nftObj;
                },
            );

        };

        public func importNFTs(tokenData : [{ tid : Text; metadata : Text }], userId : Principal) : async Result.Result<Text, Text> {
            try {
                await Functions.checkAnonymous(userId);
                var isImported = false;

                for (token in tokenData.vals()) {
                    let nftExists = checkIfNFTExist(token.tid);
                    if (nftExists == true) {
                        return #err("NFT Already Imported" # token.tid);
                    };

                    let result = userHandler.addNFT(userId, token.tid, token.metadata, EXTCanisterId);

                    switch result {
                        case (#ok(nft)) {
                            addNFT(token.tid, toMutableNFT(nft));
                            isImported := true;
                        };
                        case (#err(err)) {
                            isImported := false;
                            return #err("User Not Authorized");
                        };
                    };
                };
                return #ok("Imported");

            } catch (err) {
                return #err(Error.message(err));
            };
        };

        public func getPoints(nftID : Text, userId : Principal) : async Result.Result<Nat, Text> {
            let nft = stakedNftRecords.get(nftID);
            switch nft {
                case null {
                    return #err("NFT Does not Exist");
                };
                case (?nft) {
                    if(nft.owner != userId) {
                        return #err("User Not Authorized");
                    };
                    let stakedAt : ?Nat = switch (nft.stakedAt) {
                        case null null;
                        case (?int) Nat.fromText(Int.toText(int));
                    };

                    let stakedAtTime : Nat = switch stakedAt {
                        case null 0;
                        case (?nat) nat;
                    };
                    let pointsAccumulated = await Functions.calculateReward(stakedAtTime, nft.rarity);
                    return #ok(pointsAccumulated);
                };
            };
        };

        public func stakeNFT(nftID : EXT.TokenIdentifier, userId : Principal) : async Result.Result<Text, TransferError> {
            let nftIdx : Nat = Nat32.toNat(TokenIdentifier.getIndex(nftID));
            let _nftID : Text = Nat.toText(nftIdx);

            let ?nft = nftRecords.get(_nftID) else return #err(#InvalidToken(_nftID));
            let ?user = userHandler.get(userId) else return #err(#Unauthorized("User does not exist"));

            switch (nft) {
                case (nft) {
                    if (nft.isStaked == true) {
                        return #err(#Other("NFT Already Staked"));
                    };

                    if (nft.owner != userId) {
                        return #err(#Unauthorized(Principal.toText(userId)));
                    };

                    let CANISTERPRINCIPAL = Principal.fromText(BackendCanisterId);

                    let transferResult = await transferNFT(nftID, userId, CANISTERPRINCIPAL);
                    switch (transferResult) {
                        case (#ok(msg)) {
                            nft.isStaked := true;
                            nft.stakedAt := ?Time.now();
                            stakedNftRecords.put(nft.id, nft);
                            userHandler.appendStakedNFT(nft.id, userId);

                            return #ok("Staked Successfully");
                        };
                        case (#err(err)) {
                            return #err(err);
                        };
                    };
                };
            };
        };

        public func unstakeNFT(nftID : EXT.TokenIdentifier, userId : Principal) : async Result.Result<Text, TransferError> {
            let nftIdx : Nat = Nat32.toNat(TokenIdentifier.getIndex(nftID));
            let _nftID : Text = Nat.toText(nftIdx);

            let ?nft = stakedNftRecords.get(_nftID) else return #err(#InvalidToken(_nftID));

            switch (nft) {
                case (nft) {
                    // if (nft.isStaked == false) {
                    //     return #err(#Other("NFT Not Staked"));
                    // };

                    // if(nft.owner != userId) {
                    //     return #err(#Unauthorized(Principal.toText(userId)));
                    // };

                    let CANISTERPRINCIPAL = Principal.fromText(BackendCanisterId);

                    let transferResult = await transferNFT(nftID, CANISTERPRINCIPAL, userId);
                    switch (transferResult) {
                        case (#ok(msg)) {
                            let stakedAt : ?Nat = switch (nft.stakedAt) {
                                case null null;
                                case (?int) Nat.fromText(Int.toText(int));
                            };

                            let stakedAtTime : Nat = switch stakedAt {
                                case null 0;
                                case (?nat) nat;
                            };

                            let pointsAccumulated = await Functions.calculateReward(stakedAtTime, nft.rarity);
                            nft.isStaked := false;
                            nft.stakedAt := null;
                            let _awardUser = userHandler.awardPoints(userId, pointsAccumulated);
                            stakedNftRecords.delete(_nftID);
                            let removeNFT = userHandler.removeStakedNFT(_nftID, userId);
                            if (removeNFT == false) {
                                return #err(#Other("Can't remove staked NFT"));
                            };

                            return #ok("Unstaked Successfully");
                        };
                        case (#err(err)) {
                            return #err(err);
                        };
                    };
                };
            };
        };

        private func transferNFT(nftID : EXT.TokenIdentifier, from : Principal, to : Principal) : async Result.Result<Text, TransferError> {

            let transferRequest : EXT.TransferRequest = {
                to = #principal to;
                token = nftID;
                notify = false;
                from = #principal from;
                memo = "Staking NFT";
                amount = 1;
                subaccount = null;
            };

            let transferResponse = await EXTActor.transfer(transferRequest);
            switch (transferResponse) {
                case (#ok(_)) {
                    return #ok("NFT Staked Successfully");
                };
                case (#err(err)) {
                    return #err(err);
                };
            };
        };

        private func checkIfNFTExist(nftId : Text) : Bool {
            switch (nftRecords.get(nftId)) {
                case (?nft) {
                    return true;
                };
                case (null) {
                    return false;
                };
            };
        };

        private func getNFTFromEXT(aid : Text) : async Result.Result<[EXT.TokenIndex], EXT.CommonError> {
            let tokenResponse = await EXTActor.tokens(aid);
            switch (tokenResponse) {
                case (#ok(tokens)) {
                    return #ok(tokens);
                };
                case (#err(err)) {
                    return #err(err);
                };
            };
        };

        private func fromMutableNFT(nft : MutableNFT) : Nft {
            {
                id = nft.id;
                owner = nft.owner;
                isStaked = nft.isStaked;
                rarity = nft.rarity;
                canisterID = nft.canisterID;
                stakedAt = nft.stakedAt;
                metadata = nft.metadata;
            };
        };
    };
};
