import { NextRequest, NextResponse } from "next/server";
import {
  Hex,
  WriteContractErrorType,
  createClient,
  http,
  publicActions,
} from "viem";

import Contract from "@/lib/abi.json";

import { getServerSession } from "next-auth/next";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
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

  const client = createClient({
    chain: baseSepolia,
    transport: http(process.env.THIRD_WEB_RPC_URL),
  }).extend(publicActions);

  try {
    const response = await client.readContract({
      address: chainInfo.baseSepolia.contract as Hex,
      abi: Contract.abi,
      functionName: "getTierMintCount",
      args: [userWallet.address, id],
    });

    // @ts-ignore
    return NextResponse.json({ isMinted: response >= 1n });
  } catch (e) {
    const error = e as WriteContractErrorType;

    return NextResponse.json(
      // @ts-ignore
      { message: error.cause.shortMessage },
      { status: 500 }
    );
  }
}
