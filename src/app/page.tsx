import SignIn from "@/components/signIn";

export default function Home() {
  return (
    <>
      <section className="h-dvh p-6">
        <div className="h-full bg-primary rounded-3.5xl s:rounded-4xl flex flex-row p-6">
          <div className="basis-2/5">
            <img src="/logo-flip.png " className="w-[200px] h-[200px]" />
            <h2 className="font-display text-5xl m-3">
              Experience Coldplay Live
            </h2>
            <h3 className="text-3xl font-display">
              <span className="underline">
                <span> MUSIC of the SPHERES tour</span>
              </span>
            </h3>
            <p className="text-lg">
              Join Coldplay on their highly anticipated MUSIC of the SPHERES
              tour! Experience a stunning performance in the magical city of
              Lumina Falls, renowned for its shimmering skies and cascading
              starlight. With a blend of heart-stirring anthems and mesmerizing
              visuals, this night promises to be an unforgettable journey.
              Secure your tickets now and let Coldplay's music guide you through
              an extraordinary evening under the stars.
            </p>
            <SignIn />
          </div>
          <figure className="basis-3/5 flex flex-col relative">
            <div className="absolute flex justify-center w-[75%] h-[75%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                src="/overlay.png"
                className="object-contain animate-spin-slow"
              />
            </div>
            <img
              src="/coldplay.png"
              className="w-full object-contain min-h-0 h-full"
            />
          </figure>
        </div>
      </section>
    </>
  );
}
