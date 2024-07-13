import UserTypes "../models/User";
import NFTTypes "../models/NFT";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Utils "../Utils";
import EXT "../actors/EXT";
import User "../models/User";

module {
    public type InvalidError = {
        #UserNotFound;
        #EmailExist;
        #InvalidEmail;
        #MissingData;
        #InvalidPassword;
        #Other : Text;
        #alreadyOwner;
        #Unauthorized;
        #UserAlreadyExists;
    };

    type User = UserTypes.User;

    type MutableUser = {
        id : Principal;
        var email : Text;
        var name : Text;
        var rewardPoints : Nat;
        var rank : Nat;
        var importedNFTs : [Text];
        var stakedNFTs : [Text];
    };

    public type StableData = {
        users : [User];
    };

    public class UserHandler(userData : StableData) {

        private func toMutableUser(user : User) : MutableUser {
            {
                id = user.id;
                var email = user.email;
                var name = user.name;
                var rewardPoints = user.rewardPoints;
                var importedNFTs = user.importedNFTs;
                var stakedNFTs = user.stakedNFTs;
                var rank = user.rank;
            };
        };

        private func buildUserMap(users : [User]) : TrieMap.TrieMap<Principal, MutableUser> {
            users.vals()
            |> Iter.map(_, toMutableUser)
            |> Iter.map<MutableUser, (Principal, MutableUser)>(
                _,
                func(p : MutableUser) : (Principal, MutableUser) {
                    return (p.id, p);
                },
            )
            |> TrieMap.fromEntries(_, Principal.equal, Principal.hash);
        };

        let userRecords : TrieMap.TrieMap<Principal, MutableUser> = buildUserMap(userData.users);

        public func toStableData() : StableData {
            {
                users = userRecords.vals() |> Iter.map(_, fromMutableUser) |> Iter.toArray(_);
            };
        };

        public func get(id : Principal) : ?User {
            let ?user = userRecords.get(id) else return null;
            ?fromMutableUser(user);
        };

        public func getAll() : [User] {
            userRecords.vals()
            |> Iter.map(_, fromMutableUser)
            |> Iter.toArray(_);
        };

        public func awardPoints(userId : Principal, points : Nat) : Result.Result<(), { #Unauthorized }> {
            let ?user = userRecords.get(userId) else return #err(#Unauthorized);
            user.rewardPoints += points;
            #ok;
        };

        public func addNFT(userId : Principal, nftId : Text, metadata : EXT.Metadata, canID : Text) : Result.Result<NFTTypes.NFT, { #UserNotFound }> {
            let ?user = userRecords.get(userId) else return #err(#UserNotFound);
            let nftBuffer = Buffer.fromArray<Text>(user.importedNFTs);

            let newImportedNFT : NFTTypes.NFT = {
                id = nftId;
                metadata = Utils.serializeMetadata(metadata);
                owner = userId;
                isStaked = false;
                canisterID = canID;
                rarity = Utils.extractRarity(Utils.serializeMetadata(metadata));
                stakedAt = null;
            };

            let newImportedNFTList : Buffer.Buffer<Text> = Buffer.fromArray(user.importedNFTs);
            newImportedNFTList.add(newImportedNFT.id);

            let newUserData : MutableUser = {
                id = user.id;
                var stakedNFTs = user.stakedNFTs;
                var name = user.name;
                var email = user.email;
                var rewardPoints = user.rewardPoints;
                var importedNFTs = Buffer.toArray(newImportedNFTList);
                var rank = user.rank;
            };

            userRecords.put(userId, newUserData);

            return #ok(newImportedNFT);
        };

        public func createUser(input : UserTypes.UserInput, userId : Principal) : Result.Result<Text, InvalidError> {
            if (input.email == "") {
                return #err(#InvalidEmail);
            };
            if (input.name == "") {
                return #err(#MissingData);
            };
            // Add validation for E-mail

            if (checkUserExists(userId)) {
                return #err(#UserAlreadyExists);
            };
            let newUser = createNewUser(input, userId);
            userRecords.put(userId, newUser);
            #ok("User Created Successfully");
        };

        public func updateUserProfile(id : Principal, updatedUserData : { name : ?Text; email : ?Text }) : Result.Result<Text, { #UserNotFound; #MissingData; #NotAuthorized }> {
            let ?user = userRecords.get(id) else return #err(#UserNotFound);
            switch (updatedUserData.name) {
                case (?name) {
                    user.name := name;
                };
                case (null) {
                    switch (updatedUserData.email) {
                        case (?email) {
                            user.email := email;
                        };
                        case (null) {
                            return #err(#MissingData);
                        };
                    };
                };
            };
            return #ok("User Updated Successfully");
        };

        private func checkUserExists(id : Principal) : Bool {
            switch (userRecords.get(id)) {
                case (?user) {
                    return true;
                };
                case (null) {
                    return false;
                };
            };
        };

        private func createNewUser(input : UserTypes.UserInput, userId : Principal) : MutableUser {
            {
                id = userId;
                var email = input.email;
                var name = input.name;
                var rewardPoints = 0;
                var importedNFTs = [];
                var stakedNFTs = [];
                var rank = 0;
            };
        };

        private func getUser(id : Principal) : Result.Result<MutableUser, { #UserNotFound; #Unauthorized }> {
            let user = userRecords.get(id);
            switch (user) {
                case (?u) {
                    return #ok(u);
                };
                case (null) {
                    return #err(#UserNotFound);
                };
            };
        };

        private func fromMutableUser(user : MutableUser) : User {
            {
                id = user.id;
                email = user.email;
                name = user.name;
                rewardPoints = user.rewardPoints;
                importedNFTs = user.importedNFTs;
                stakedNFTs = user.stakedNFTs;
                rank = user.rank;
            };
        };
    };
};
