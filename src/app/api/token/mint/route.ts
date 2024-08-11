import { NextRequest, NextResponse } from "next/server";
import { Hex, WriteContractErrorType, encodeFunctionData } from "viem";

import Contract from "@/lib/abi.json";

import { getServerSession } from "next-auth/next";
import { sessionToAccount, sessionToPK } from "@/lib/wallet";
import { chainInfo } from "@/lib/config";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { LocalAccountSigner, baseSepolia } from "@alchemy/aa-core";

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

  const signer = LocalAccountSigner.privateKeyToAccountSigner(
    sessionToPK(session)
  );

  const client = await createModularAccountAlchemyClient({
    apiKey: process.env.ALCHEMY_API_KEY!,
    chain: baseSepolia,
    signer,
    gasManagerConfig: {
      policyId: process.env.ALCHEMY_POLICY_ID!,
    },
  });

  try {
    const result = await client.sendUserOperation({
      uo: {
        target: chainInfo.baseSepolia.contract as Hex,
        data: encodeFunctionData({
          abi: Contract.abi,
          functionName: "mintTicket",
          args: [userWallet.address, id],
        }),
      },
    });
    const txHash = await client.waitForUserOperationTransaction(result);
    return NextResponse.json({ message: "Ticket minted!", txHash });
  } catch (e) {
    return NextResponse.json(
      // @ts-ignore
      { message: "Purchase failed" },
      { status: 500 }
    );
  }
}
