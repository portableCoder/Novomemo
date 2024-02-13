import { Button } from "@app_types/Button";
import clsx from "clsx";
import React from "react";

const EditorButton = (props: Button) => {
  const { buttonActive, icon, children, className, ...rest } = props;

  const active = clsx({
    "text-indigo-500": buttonActive,
    "bg-zinc-800": buttonActive,
  });

  return (
    <button
      {...rest}
      className={`flex flex-col justify-center items-center gap-y-2 p-2 rounded-md hover:bg-zinc-800 ${active} ${
        className || ""
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

export default EditorButton;
