import { Button } from "@app_types/Button";
import clsx from "clsx";
import React from "react";

const MenuButton = ({ icon, children, onClick, buttonActive }: Button) => {
  const sel = clsx({
    "bg-zinc-800": buttonActive,
  });
  return (
    <button
      onClick={onClick}
      className={`${sel} items-center text-lg flex flex-col gap-y-2 gap-x-2 p-4 hover:font-bold justify-center capitalize rounded-md hover:bg-zinc-800 w-full`}
    >
      <div>{icon}</div>
      {children && (
        <div className="flex justify-between w-full">{children}</div>
      )}
    </button>
  );
};

export default MenuButton;
