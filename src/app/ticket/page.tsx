import Button from "@/components/Button";
import Logo from "@/components/logo";

export default function page() {
  return (
    <>
      <figure className="basis-3/5 flex flex-col relative">
        <img
          src="/ticket.jpg"
          className="w-full object-contain min-h-0 h-full rounded-3xl"
        />
      </figure>
      <div className="basis-2/5">
        <Logo />
        <h2 className="font-display text-5xl m-3 mt-10">Ticket confirmed!</h2>
        <h3 className="text-3xl font-display">
          <span className="underline">
            <span> MUSIC of the SPHERES tour</span>
          </span>
        </h3>
        <h3 className="text-2xl font-display mt-4">
          📅 Aug 17, 2024 // Berlin
        </h3>
        <p className="text-lg">
          Join Coldplay on their highly anticipated MUSIC of the SPHERES tour!
          Experience a stunning performance in the magical city of Lumina Falls,
          renowned for its shimmering skies and cascading starlight. With a
          blend of heart-stirring anthems and mesmerizing visuals, this night
          promises to be an unforgettable journey. Secure your tickets now and
          let Coldplay's music guide you through an extraordinary evening under
          the stars.
        </p>
        <Button href="/">
          View on blockchain
          <img src="/right-arrow.png" className="inline-block mr-2 ml-4 w-8" />
        </Button>
      </div>
    </>
  );
}
