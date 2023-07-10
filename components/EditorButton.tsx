import { Button } from "@app_types/Button";
import clsx from "clsx";
import React from "react";

const EditorButton = (props: Button) => {
  const active = clsx({
    "text-indigo-500": props.active,
    "bg-zinc-800": props.active,
  });

  return (
    <button
      {...props}
      className={`flex flex-col justify-center items-center gap-y-2 p-2 rounded-md hover:bg-zinc-800 ${active} ${
        props.className || ""
      }`}
    >
      {props.icon}
      {props.children}
    </button>
  );
};

export default EditorButton;
