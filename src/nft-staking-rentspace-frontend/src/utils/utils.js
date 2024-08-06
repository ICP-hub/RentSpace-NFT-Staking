import { principalToAccountIdentifier } from '@dfinity/ledger-icp'
import { Principal } from '@dfinity/principal';
import { Buffer } from 'buffer'
import { canisterID } from '../../../canisterId';

export const convertPrincipalToAccountIdentifier = async (principal) => {
  const accountIdentifier = await principalToAccountIdentifier(principal)
  return accountIdentifier
}


export function formatMetadata(str) {
  let val = str.split("22").join('')
  val = val.split('\\').join('"')
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
  const canID = canisterID.EXT
  return encodeTokenIdentifier(canID, tokenIdx);
}

export function convertPointstoICP(points) {
  // convert points from bigint to int
  let pointsInt = Number(points)
  return pointsInt * 0.01;
}