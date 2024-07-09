import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";
import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import NftModel "./models/NFT";


module{
    public func checkAnonymous(_user:Principal): async(){
        if(Principal.isAnonymous(_user)){
            let err=Error.reject("Anonymous users cannot interact!");
            throw err;
        };
    };
    
    public func calculateReward(_stakeTime:Int, rarity : NftModel.Rarity):async Nat{
        let currTime:Int=Time.now();
        let rarityToPoint : Nat = Nat8.toNat(extractRarityPoints(rarity));

        if(currTime < _stakeTime){
            let err=Error.reject("In-correct stake time for nft");
            throw err;
        };

        let diff=Float.fromInt(currTime - _stakeTime) / 10000000000;
        return Int.abs(Float.toInt(diff)) * rarityToPoint;
    };

    public func serializeMetadata(_metadata : {#fungible : {decimals : Nat8; metadata : Text; name : Text; symbol : Text}; #nonfungible : {metadata : Text}}): Text{
        switch(_metadata){
            case (#fungible(data)){
                return "Fungible Token: Name: ";
            };
            case (#nonfungible(data)){
                return data.metadata;
            };
        };
    };
    public func extractRarity(_metadata : Text) : NftModel.Rarity {
        var rarity : NftModel.Rarity = #Common(1);
        if(Text.contains(_metadata, #text "Uncommon")){
            rarity := #Uncommon(2);
        }
        else if(Text.contains(_metadata, #text "Rare")) {
            rarity := #Rare(3);
        }
        else if(Text.contains(_metadata, #text "Epic")) {
            rarity := #Epic(4);
        }
        else if(Text.contains(_metadata, #text "Legendary")) {
            rarity := #Legendary(5);
        };

        return rarity;
    };

    public func convertPointsToICP(points : Nat) : Nat {
        // ICP = Points * 0.01
        // Tokens = 10^8
        // i.e return points * 10^6
        return(points * 1000000);
    };

    private func extractRarityPoints(rarity : NftModel.Rarity) : Nat8 {
        switch(rarity) {
            case(#Common(p)) {
                return p;
            };
            case(#Uncommon(p)) {
                return p;
            };
            case(#Rare(p)) {
                return p;
            };
            case(#Epic(p)) {
                return p;
            };
            case(#Legendary(p)) {
                return p;
            };
        };
    };
}