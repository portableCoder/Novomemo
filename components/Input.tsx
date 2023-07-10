import React from "react";

export const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`p-4 my-2 rounded-md w-full bg-transparent text-white outline outline-2 outline-zinc-700 focus:outline-indigo-500 ${props.className}`}
    />
  );
};
