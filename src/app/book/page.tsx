import Button from "@/components/Button";
import Logo from "@/components/logo";

const tickets = [
  {
    title: "VIP Lounge",
    description:
      "Front-row seats, VIP lounge access, meet-and-greet with the artist, a tour program, limited-edition poster, and a premium gift bag. Complimentary food and drinks included.",
    price: 500,
  },
  {
    title: "Platinum Premier Seating",
    description:
      "Premium seats in the first ten rows, access to a pre-show lounge with appetizers and drinks, a collectible poster, and an event lanyard.",
    price: 250,
  },
  {
    title: "Standard Access",
    description:
      "General admission seating with a good view of the stage. Enjoy the concert at an affordable price.",
    price: 75,
  },
];

function Card({ ticket }: any) {
  return (
    <div className="border-4 flex flex-col border-black rounded-xl p-2 mb-4">
      <h3 className="font-display text-3xl">{ticket.title}</h3>
      <h4 className="font-display text-xl m-0">${ticket.price}</h4>
      <p className="my-2">{ticket.description}</p>
      <div>
        <Button href="/ticket">
          <img src="/worldcoin.svg" className="inline-block mr-2" />
          Continue with Worldcoin
        </Button>
      </div>
    </div>
  );
}

function page() {
  return (
    <div className="flex">
      <div className="basis-3/5">
        <div className="flex flex-col">
          <Logo />
          <img src="/stadium.png" className="object-contain w-[80%]" />
        </div>
      </div>
      <div className="p-2 basis-2/5">
        <h3 className="text-3xl font-display mb-5">
          <span className="underline">
            <span>Tickets</span>
          </span>
        </h3>
        {tickets.map((ticket, i) => (
          <Card ticket={ticket} key={i} />
        ))}
      </div>
    </div>
  );
}

export default page;
