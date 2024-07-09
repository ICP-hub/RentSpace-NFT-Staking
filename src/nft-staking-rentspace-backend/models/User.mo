import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import NFTTypes "NFT";
module {
    public type User = {
        id : Principal;
        name : Text;
        email : Text;
        rewardPoints : Nat;
        rank : Nat;
        importedNFTs : [NFTTypes.NFT];
        stakedNFTs : [NFTTypes.NFT];
    };

    public type UserInput = {
        name : Text;
        email : Text;
    };
}