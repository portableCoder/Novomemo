import React, { ReactNode } from "react";
import Spinner from "./Spinner";
import { Check, X } from "react-feather";
interface ModalProps {
  children?: any;
  title: string;
}
const Modal = ({ children, title }: ModalProps) => {
  return (
    <div className="text-white rounded-md  z-50 backdrop-blur-2xl fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="flex w-3/4 md:w-1/4 rounded-md shadow-2xl  flex-col p-4 text-3xl bg-zinc-900 outline outline-1 outline-zinc-700">
        <div>{title}</div>
        <div className="my-6 items-center flex justify-center text-3xl">
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
};

const LoadingModal = () => {
  return (
    <Modal title="Hold on..">
      <Spinner />
    </Modal>
  );
};
interface WarningModalProps {
  title: string;
  onClick?: (ok: boolean) => void;
  children: ReactNode;
}
const WarningModal = ({ title, children, onClick }: WarningModalProps) => {
  return (
    <Modal title={title}>
      <div className="w-full h-full flex flex-col">
        {children}
        <div className="flex gap-x-2  w-full items-end">
          <button
            onClick={() => {
              if (onClick) {
                onClick(false);
              }
            }}
            className="justify-center items-center w-full flex p-4 gap-x-2 rounded-md border border-zinc-800"
          >
            <div>
              {" "}
              <X />{" "}
            </div>{" "}
            Cancel
          </button>
          <button
            onClick={() => {
              if (onClick) onClick(true);
            }}
            className="flex gap-x-2 p-4 w-full rounded-md bg-red-500 justify-center items-center"
          >
            <div>
              {" "}
              <Check />
            </div>{" "}
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;
export { LoadingModal, WarningModal };
