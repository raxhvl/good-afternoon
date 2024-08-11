import { Hex, keccak256 } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// KEEP SECRET!
const SALT = "77233595c0ffee";

export const sessionToAccount = (session: any) => {
  const username = (session.user.name + SALT) as Hex;
  const pk = keccak256(username);
  return privateKeyToAccount(pk);
};
