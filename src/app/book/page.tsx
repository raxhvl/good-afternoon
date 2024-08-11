"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Logo from "@/components/logo";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tickets = [
  {
    title: "VIP Lounge",
    id: 0,
    description:
      "Front-row seats, VIP lounge access, meet-and-greet with the artist, a tour program, limited-edition poster, and a premium gift bag. Complimentary food and drinks included.",
    price: 500,
  },
  {
    title: "Platinum Premier Seating",
    id: 1,
    description:
      "Premium seats in the first ten rows, access to a pre-show lounge with appetizers and drinks, a collectible poster, and an event lanyard.",
    price: 250,
  },
  {
    title: "Standard Access",
    id: 2,
    description:
      "General admission seating with a good view of the stage. Enjoy the concert at an affordable price.",
    price: 75,
  },
];

function Card({ ticket }: any) {
  const { data: session } = useSession();
  const router = useRouter();
  const [minted, setMinted] = useState(false);

  const checkIfMinted = async () => {
    const response = await fetch("/api/token/validate", {
      method: "POST",
      body: JSON.stringify({ session, id: ticket.id }),
    });

    if (response.ok) {
      const { isMinted } = await response.json();
      console.log(isMinted);
      setMinted(isMinted);
    }
  };

  useEffect(() => {
    checkIfMinted();
  }, []);

  const mint = async () => {
    try {
      const response = await fetch("/api/token/mint", {
        method: "POST",
        body: JSON.stringify({ session, id: ticket.id }),
      });

      // Check if response is ok (status code 200-299)
      if (!response.ok) {
        // Extract and parse error message from the response
        const errorData = await response.json();
        throw new Error(errorData.message || "Purchase Failed");
      }

      const data = await response.json();

      if (data.txHash) {
        router.push(`/ticket/${data.txHash}`);
      }
    } catch (e) {
      // @ts-ignore
      alert(e.message);
    }
  };

  return (
    <div className="border-4 flex flex-col border-black rounded-xl p-2 mb-2">
      <h3 className="font-display text-2xl">{ticket.title}</h3>
      <h4 className="font-display text-xl m-0">${ticket.price}</h4>
      <p className="my-2">{ticket.description}</p>
      <div>
        {!minted ? (
          <Button onClick={() => mint()}>
            Buy Ticket
            <img
              src="/right-arrow.png"
              className="inline-block mr-2 ml-4 w-8"
            />
          </Button>
        ) : (
          <div className="text-2xl font-display">✅ Ticket purchased !</div>
        )}
      </div>
    </div>
  );
}

function page() {
  const { status } = useSession();

  if (status == "loading") {
    return <Loading />;
  }

  if (status == "unauthenticated") {
    return signIn("worldcoin");
  }

  return (
    <div className="flex">
      <div className="basis-3/5">
        <div className="flex flex-col">
          <Logo />
          <img src="/stadium.png" className="object-contain w-[80%]" />
        </div>
      </div>
      <div className="p-2 basis-2/5">
        <h3 className="text-3xl font-display mb-3">
          <span className="underline">Welcome</span>
        </h3>
        {tickets.map((ticket, i) => (
          <Card ticket={ticket} key={i} />
        ))}
      </div>
    </div>
  );
}

export default page;
