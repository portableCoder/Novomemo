import React from "react";
import { Loader } from "react-feather";

const Spinner = () => {
  return (
    <div className="">
      <Loader className="animate-spin text-3xl " />
    </div>
  );
};

export default Spinner;
