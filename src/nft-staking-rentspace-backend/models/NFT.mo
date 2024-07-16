import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
module {
    public type Rarity = {
        #Common : Nat8;
        #Uncommon : Nat8;
        #Rare : Nat8;
        #Epic : Nat8;
        #Legendary : Nat8;
    };

    public type NFT = {
        id : Text;
        metadata : Text;
        isStaked : Bool;
        rarity : Rarity;
        canisterID : Text;
        owner : Principal;
        stakedAt : ?Int;
    }
}