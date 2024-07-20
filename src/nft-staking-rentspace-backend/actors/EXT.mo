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
  public type Listing = { locked : ?Time; seller : Principal; price : Nat64 };
  public type Memo = Blob;
  public type Metadata = {
    #fungible : {
      decimals : Nat8;
      metadata : ?Blob;
      name : Text;
      symbol : Text;
    };
    #nonfungible : { metadata : ?Blob };
  };
  public type MetadataStorageInfo = {
    url : Text;
    thumb : Text;
    environmentImageThree : Text;
  };
  public type MetadataStorageType = { #S3; #Last; #Fleek; #MetaBox };
  public type MintRequest = { to : User; metadata : ?Blob };
  public type Property = { trait_type : Text; value : Text };
  public type Result = {
    #ok : [(TokenIndex, ?Listing, ?Blob)];
    #err : CommonError;
  };
  public type Result_1 = { #ok : [TokenIndex]; #err : CommonError };
  public type Result_2 = { #ok : Balance__1; #err : CommonError };
  public type Result__1 = { #ok : Metadata; #err : CommonError };
  public type Result__1_1 = { #ok : AccountIdentifier__1; #err : CommonError };
  public type Result__1_2 = { #ok : Balance__1; #err : CommonError };
  public type SubAccount = Blob;
  public type Time = Int;
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
  public type Self = actor {
    acceptCycles : shared () -> async ();
    addMetadataStorageType : shared Text -> ();
    addMetadataUrlMany : shared [
        (MetadataStorageType, TokenIndex, MetadataStorageInfo)
      ] -> ();
    allowance : shared query AllowanceRequest -> async Result__1_2;
    approve : shared ApproveRequest -> async Bool;
    approveAll : shared [ApproveRequest] -> async [TokenIndex];
    availableCycles : shared query () -> async Nat;
    balance : shared query BalanceRequest -> async BalanceResponse;
    batchMintNFT : shared [MintRequest] -> async [TokenIndex];
    batchTransfer : shared [TransferRequest] -> async [TransferResponse];
    bearer : shared query TokenIdentifier__1 -> async Result__1_1;
    clearProperties : shared () -> ();
    deleteMetadataStorageType : shared Text -> ();
    extensions : shared query () -> async [Extension];
    getAllowances : shared query () -> async [(TokenIndex, Principal)];
    getMedataStorageType : shared () -> async [Text];
    getMinter : shared query () -> async Principal;
    getProperties : shared query () -> async [(Text, [(Text, Nat)])];
    getRegistry : shared query () -> async [(TokenIndex, AccountIdentifier__1)];
    getRootBucketId : shared () -> async ?Text;
    getScore : shared query () -> async [(TokenIndex, Float)];
    getStorageMetadataUrl : shared (MetadataStorageType, TokenIndex) -> async (
        (Text, Text, Text)
      );
    getTokens : shared query () -> async [(TokenIndex, Metadata)];
    getTokensByIds : shared query [TokenIndex] -> async [
        (TokenIndex, Metadata)
      ];
    getTokensByProperties : shared query [(Text, [Text])] -> async [
        (TokenIndex, Metadata)
      ];
    http_request : shared query HttpRequest -> async HttpResponse;
    initCap : shared () -> async ?Text;
    initLastMetadata : shared (TokenIndex, TokenIndex) -> async ();
    initproperties : shared (TokenIndex, TokenIndex) -> async ();
    lookProperties : shared query () -> async [(Property, [TokenIndex])];
    lookPropertyScoreByTokenId : shared query () -> async [
        (TokenIndex, [(Property, Int64)])
      ];
    metadata : shared query TokenIdentifier__1 -> async Result__1;
    mintNFT : shared MintRequest -> async TokenIndex;
    replaceMetadata : shared (
        MetadataStorageType,
        TokenIndex,
        TokenIndex,
      ) -> async ();
    setMinter : shared Principal -> async ();
    setScoreOfTokenId : shared Int64 -> async ();
    supply : shared query TokenIdentifier__1 -> async Result_2;
    tokens : shared query AccountIdentifier__1 -> async Result_1;
    tokens_ext : shared query AccountIdentifier__1 -> async Result;
    transfer : shared TransferRequest -> async TransferResponse;
    updateMetadata : shared [(TokenIndex, ?Blob)] -> async ();
    updateNFTName : shared (Text, Text, TokenIndex, TokenIndex) -> async ();
  }
}