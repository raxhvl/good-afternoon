"use client";

import Button from "@/components/Button";
import Logo from "@/components/logo";

import { useSession, signIn, signOut } from "next-auth/react";

export default function page({ params }: any) {
  return (
    <>
      <figure className="basis-3/5 flex flex-col relative">
        <img src="/ticket.jpg" className="object-contain min-h-0  rounded-md" />
        <div className="self-center mt-8">
          <Button
            href={`https://base-sepolia.blockscout.com/tx/${params.txHash}`}
            newWindow
          >
            View on blockchain
            <img
              src="/right-arrow.png"
              className="inline-block mr-2 ml-4 w-8"
            />
          </Button>
        </div>
      </figure>
      <div className="basis-2/5">
        <Logo />
        <h3 className="text-5xl font-display">
          <span className="underline">
            <span>Ticket confirmed!</span>
          </span>
        </h3>
        <h3 className="text-2xl font-display mt-4">
          📅 Aug 17, 2024 // Berlin
        </h3>
        <p className="text-lg">
          Join Coldplay on their highly anticipated MUSIC of the SPHERES tour!
          Experience a stunning performance in the magical city of Berlin,
          renowned for its shimmering skies and cascading starlight.
        </p>
        <img src="/map.png" className="rounded-md mb-4" />
        <Button href="https://g.co/kgs/Fus1rsz" newWindow>
          View on maps
          <img src="/right-arrow.png" className="inline-block mr-2 ml-4 w-8" />
        </Button>
      </div>
    </>
  );
}
