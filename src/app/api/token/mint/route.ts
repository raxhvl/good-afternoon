import { NextRequest, NextResponse } from "next/server";
import {
  Hex,
  WriteContractErrorType,
  createWalletClient,
  http,
  publicActions,
} from "viem";

import Contract from "@/lib/abi.json";

import { getServerSession } from "next-auth/next";
import { privateKeyToAccount } from "viem/accounts";
import { sessionToAccount } from "@/lib/wallet";
import { chainInfo } from "@/lib/config";

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

  const userWallet = sessionToAccount(session);
  console.log(userWallet.address);

  const paymaster = privateKeyToAccount(process.env.PAYMSTER_KEY as Hex);

  const client = createWalletClient({
    account: paymaster,
    chain: chainInfo.anvil.chain,
    transport: http(process.env.ALCHEMY_RPC_URL),
  }).extend(publicActions);

  try {
    const txHash = await client.writeContract({
      address: chainInfo.anvil.contract as Hex,
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
