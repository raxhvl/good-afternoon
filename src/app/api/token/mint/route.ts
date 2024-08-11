import { NextRequest, NextResponse } from "next/server";
import {
  Hex,
  WriteContractErrorType,
  createWalletClient,
  http,
  keccak256,
  publicActions,
} from "viem";

import Contract from "@/lib/abi.json";

import { getServerSession } from "next-auth/next";
import { privateKeyToAccount } from "viem/accounts";
import { anvil } from "viem/chains";

// KEEP SECRET!
const SALT = "77233595c0ffee";

export async function POST(request: NextRequest) {
  //   !!! Dangerous: THIS IS A HUGE SECURITY FLAW !!!
  //   The session should be validating before proceeding
  //   Currently disabled because World Coin APIs were down during testing
  //   const session = await getServerSession();
  //   if(!session){
  //     return NextResponse.json({ error: "Internal Server Error" }, {status:401});
  //   }
  //   const session = await getServerSession(request, response, authOptions);
  //   console.log(session);

  const { session, id } = await request.json();
  const username = (session.user.name + SALT) as Hex;
  const pk = keccak256(username);

  const userWallet = privateKeyToAccount(pk);

  console.log(userWallet.address);

  const paymaster = privateKeyToAccount(process.env.PAYMSTER_KEY as Hex);

  const client = createWalletClient({
    account: paymaster,
    chain: anvil,
    transport: http(),
  }).extend(publicActions);

  try {
    const txHash = await client.writeContract({
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: Contract.abi,
      functionName: "mintTicket",
      args: [userWallet.address, id],
    });

    console.log(txHash);
    return NextResponse.json({ message: "Ticket minted!", txHash });
  } catch (e) {
    const error = e as WriteContractErrorType;

    return NextResponse.json(
      // @ts-ignore
      { message: error.cause.shortMessage },
      { status: 500 }
    );
  }
}
