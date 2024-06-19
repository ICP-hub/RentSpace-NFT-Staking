import {principalToAccountIdentifier} from '@dfinity/ledger-icp'
import { Principal } from '@dfinity/principal';
import {Buffer} from 'buffer'

export const convertPrincipalToAccountIdentifier = async (principal) => {
  const accountIdentifier = await principalToAccountIdentifier(principal)
  return accountIdentifier
}


export function formatMetadata(str){
    let val=str.split("22").join('')
    val=val.split('\\').join('"')
    console.log(val)
    console.log(JSON.parse(val))
    return JSON.parse(val)
}

function encodeTokenIdentifier(canisterId, tokenIndex) {
  const tds = Buffer.from([10, 116, 105, 100]);
  // Convert Canister ID to its byte representation
  const principal = Principal.fromText(canisterId);
  const canisterBytes = Buffer.from(principal.toUint8Array());

  // Encode TokenIndex as a byte array in big-endian order
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(tokenIndex, 0);

  // Concatenate tds, canisterBytes, and indexBuffer
  const combinedBuffer = Buffer.concat([tds, canisterBytes, indexBuffer]);

  // Convert the resulting byte array back to a principal
  const tokenIdentifierPrincipal = Principal.fromUint8Array(combinedBuffer);
  
  // Convert the principal to text
  return tokenIdentifierPrincipal.toText();
}

export function tokenIndexToTokenIdentifier(tokenIdx) {
  const canID=process.env.DFX_NETWORK === "ic"?"2cwjm-cyaaa-aaaap-ahi3q-cai":"be2us-64aaa-aaaaa-qaabq-cai"
  return encodeTokenIdentifier(canID, tokenIdx);
}