import { Button } from "@app_types/Button";
import clsx from "clsx";
import React from "react";
import { Icon } from "react-feather";

const MenuButton = ({ icon, children, onClick, active }: Button) => {
  const sel = clsx({
    "bg-zinc-800": active,
  });
  return (
    <button
      onClick={onClick}
      className={`${sel} items-center text-lg flex gap-x-2 p-4 hover:font-bold text-left capitalize rounded-md hover:bg-zinc-800 w-full`}
    >
      <div>{icon}</div>
      <div className="flex justify-between w-full">{children}</div>
    </button>
  );
};

export default MenuButton;
