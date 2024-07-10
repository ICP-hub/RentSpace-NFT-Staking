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
        nfts : [Nft];
    };

    public class NftHandler(nftData : StableData, userHandler : UserHandler.UserHandler) {

        let EXTCanisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
        let EXTActor = actor(EXTCanisterId) : EXT.erc721_token;
        

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
             func (p : MutableNFT) :  (Text, MutableNFT) {
                 return (p.id, p);
             }
            )
            |> TrieMap.fromEntries(_, Text.equal, Text.hash);
        };

        let nftRecords : TrieMap.TrieMap<Text, MutableNFT> = buildNftMap(nftData.nfts);

        public func toStableData() : StableData {
            {
                nfts = nftRecords.vals()|> Iter.map(_, fromMutableNFT) |> Iter.toArray(_);
            };
        };

        public func get(id : Text) : ?Nft {
            let ?nft = nftRecords.get(id) else return null;
            ?fromMutableNFT(nft);
        };

        public func getAllUserNfts(userId : Principal) : [?Nft] {
            let ?user = userHandler.get(userId);
            let userNfts = user.importedNFTs;

            let nftList = Iter.fromArray(userNfts);
            let nftArray = nftList
            |> Iter.map(_, func(nftId : Text) : ?Nft {
                let ?nft = nftRecords.get(nftId);
                ?fromMutableNFT(nft);
            })
            |> Iter.filter(_, func(nft : ?Nft) : Bool {
                switch(nft) {
                    case (?nft) {
                        return true;
                    };
                    case (null) {
                        return false;
                    };
                };
            })
            |> Iter.toArray(_);
            return nftArray;
        };

        public func getAll() : [Nft] {
            nftRecords.vals()
            |> Iter.map(_, fromMutableNFT)
            |> Iter.toArray(_);
        };

        public func importNFTs(aid : Text,id:Principal) : async Result.Result<Text,Text> {
           try {
                await Functions.checkAnonymous(id);
                let tokenResponse = await getNFTFromEXT(aid);
                switch(tokenResponse) {
                    case (#ok(tokens)) {
                        let nftList = await EXTActor.getTokensByIds(tokens);
                        for ((tokenid, metadata) in Iter.fromArray(nftList)) {
                            let tokenId = Nat32.toText(tokenid);

                            if(checkIfNFTExist(tokenId) == false) {
                                let newImportedNFT = userHandler.addNFT(id, tokenId, metadata, EXTCanisterId);
                                switch(newImportedNFT) {
                                    case (#ok(nft)) {
                                        nftRecords.put(tokenId, toMutableNFT(nft));
                                    };
                                    case (#err(err)) {
                                        return #err("User Not Found");
                                    };
                                };
                            };
                        };
                        return #ok("Successfully Imported NFTs");
                    };
                    case (#err(err)) {
                       switch(err) {
                         case(#InvalidToken(tokenId)) {
                            return #err("Invalid Token" # tokenId);
                         };
                         case(#Other(msg)) {
                            return #err("Other " #msg);
                         };
                       };
                    };
                };

           } catch(err) {
                return #err(Error.message(err));
           };
        };

        private func checkIfNFTExist(nftId : Text) : Bool {
            switch(nftRecords.get(nftId)) {
                case (?nft) {
                    return true;
                };
                case (null) {
                    return false;
                };
            };
        };

        private func getNFTFromEXT(aid : Text) : async Result.Result<[EXT.TokenIndex],EXT.CommonError> {
            let tokenResponse = await EXTActor.tokens(aid);
            switch(tokenResponse) {
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
    }
}