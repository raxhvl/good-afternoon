import { Hex, keccak256 } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// KEEP SECRET!
const SALT = "77233595c0ffee";

export const sessionToAccount = (session: any) =>
  privateKeyToAccount(sessionToPK(session));

export const sessionToPK = (session: any) => {
  const username = (session.user.name + SALT) as Hex;
  return keccak256(username);
};
