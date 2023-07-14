import React from "react";
import Spinner from "./Spinner";
interface ModalProps {
  children?: any;
  title: string;
}
const Modal = ({ children, title }: ModalProps) => {
  return (
    <div className="text-white  z-50 backdrop-blur-2xl fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="flex w-1/4 rounded-md shadow-2xl  flex-col p-4 text-3xl bg-zinc-900">
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

export default Modal;
export { LoadingModal };
