import SignIn from "@/components/signIn";

export default function Home() {
  return (
    <>
      <section className="h-dvh p-6">
        <div className="h-full bg-primary rounded-3.5xl s:rounded-4xl flex flex-row p-6">
          <div className="basis-2/5">
            <SignIn />
          </div>
          <figure className="basis-3/5 flex flex-col">
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
