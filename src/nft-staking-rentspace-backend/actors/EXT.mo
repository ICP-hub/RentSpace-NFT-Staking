// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type AccountIdentifier = Text;
  public type AccountIdentifier__1 = Text;
  public type AllowanceRequest = {
    token : TokenIdentifier;
    owner : User;
    spender : Principal;
  };
  public type ApproveRequest = {
    token : TokenIdentifier;
    subaccount : ?SubAccount;
    allowance : Balance;
    spender : Principal;
  };
  public type Balance = Nat;
  public type BalanceRequest = { token : TokenIdentifier; user : User };
  public type BalanceResponse = { #ok : Balance; #err : CommonError__1 };
  public type Balance__1 = Nat;
  public type CommonError = { #InvalidToken : TokenIdentifier; #Other : Text };
  public type CommonError__1 = {
    #InvalidToken : TokenIdentifier;
    #Other : Text;
  };
  public type Extension = Text;
  public type HeaderField = (Text, Text);
  public type HttpRequest = {
    url : Text;
    method : Text;
    body : Blob;
    headers : [HeaderField];
  };
  public type HttpResponse = {
    body : Blob;
    headers : [HeaderField];
    status_code : Nat16;
  };
  public type Memo = Blob;
  public type Metadata = {
    #fungible : {
      decimals : Nat8;
      metadata : Text;
      name : Text;
      symbol : Text;
    };
    #nonfungible : { metadata : Text };
  };
  public type MintRequest = { to : User; metadata : ?Blob };
  public type Result = { #ok : [TokenIndex]; #err : CommonError };
  public type Result_1 = { #ok : Balance__1; #err : CommonError };
  public type Result_2 = { #ok : Metadata; #err : CommonError };
  public type Result_3 = { #ok : TokenIndex; #err : CommonError };
  public type Result_4 = { #ok : AccountIdentifier__1; #err : CommonError };
  public type SubAccount = Blob;
  public type TokenIdentifier = Text;
  public type TokenIdentifier__1 = Text;
  public type TokenIndex = Nat32;
  public type TransferRequest = {
    to : User;
    token : TokenIdentifier;
    notify : Bool;
    from : User;
    memo : Memo;
    subaccount : ?SubAccount;
    amount : Balance;
  };
  public type TransferResponse = {
    #ok : Balance;
    #err : {
      #CannotNotify : AccountIdentifier;
      #InsufficientBalance;
      #InvalidToken : TokenIdentifier;
      #Rejected;
      #Unauthorized : AccountIdentifier;
      #Other : Text;
    };
  };
  public type User = { #principal : Principal; #address : AccountIdentifier };
  public type User__1 = {
    #principal : Principal;
    #address : AccountIdentifier;
  };
  public type erc721_token = actor {
    acceptCycles : shared () -> async ();
    allowance : shared query AllowanceRequest -> async Result_1;
    approve : shared ApproveRequest -> async ();
    availableCycles : shared query () -> async Nat;
    balance : shared query BalanceRequest -> async BalanceResponse;
    bearer : shared query TokenIdentifier__1 -> async Result_4;
    disribute : shared User__1 -> async ();
    extensions : shared query () -> async [Extension];
    freeGift : shared AccountIdentifier__1 -> async ?TokenIndex;
    getAllowances : shared query () -> async [(TokenIndex, Principal)];
    getBuyers : shared query () -> async [(AccountIdentifier__1, [TokenIndex])];
    getMinted : shared query () -> async TokenIndex;
    getMinter : shared query () -> async Principal;
    getRegistry : shared query () -> async [(TokenIndex, AccountIdentifier__1)];
    getSold : shared query () -> async TokenIndex;
    getTokens : shared query () -> async [(TokenIndex, Metadata)];
    getTokensByIds : shared query [TokenIndex] -> async [
        (TokenIndex, Metadata)
      ];
    http_request : shared query HttpRequest -> async HttpResponse;
    index : shared query TokenIdentifier__1 -> async Result_3;
    metadata : shared query TokenIdentifier__1 -> async Result_2;
    mintNFT : shared MintRequest -> async TokenIndex;
    setMinter : shared Principal -> async ();
    supply : shared query TokenIdentifier__1 -> async Result_1;
    tokens : shared query AccountIdentifier__1 -> async Result;
    transfer : shared TransferRequest -> async TransferResponse;
  };
  public type Self = Principal -> async erc721_token
}