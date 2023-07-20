"use client";
import { LoadingModal } from "@components/Modal";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Redirect = () => {
  const params = useParams();
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      router.push(`/login/reset${hash}`);
    } else {
      router.push("/login");
    }
  }, [params]);
  return (
    <div className="w-screen h-screen">
      <LoadingModal />
    </div>
  );
};

export default Redirect;
