import React from "react";

function Button({ href, onClick, children }: any) {
  return (
    <>
      <a
        className="group relative inline-block focus:outline-none focus:ring mb-2"
        href={href ?? "#"}
        onClick={onClick}
      >
        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-white transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
        <span className="relative border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 items-center flex">
          {children}
        </span>
      </a>
    </>
  );
}

export default Button;
