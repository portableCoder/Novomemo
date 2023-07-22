"use client";
import React from "react";
import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import useAuth from "@util/useAuth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import useStore from "@store/index";
import { LoadingModal } from "@components/Modal";
import Logo from "@components/Logo";
const Login = () => {
  const session = useAuth();
  const [supabase, loading] = useStore((s) => [s.supabase, s.globalLoading]);
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/app");
    }
  }, [session]);
  return (
    <div className="text-white w-full h-screen flex items-center justify-center ">
      {loading && <LoadingModal />}

      <div className=" rounded-md my-auto flex flex-col gap-y-2 items-center">
        <div className="flex gap-x-2 text-4xl">
          <div>
            <Logo />
          </div>
          Novomemo
        </div>
        {supabase && (
          <Auth
            providers={[]}
            supabaseClient={supabase}
            redirectTo="/login/reset"
            appearance={{
              extend: false,

              className: {
                container:
                  "flex flex-col gap-y-3 w-full  rounded-md p-4 items-center justify-center text-white",
                label: "block",
                button: "p-4  rounded-md bg-indigo-600 w-full",
                message:
                  "w-full text-center  flex items-center justify-center text-red-500",
                input:
                  "focus:border-indigo-700 w-full focus:outline-none  block text-white p-4 bg-transparent border-2 border-zinc-600 rounded-md ",
              },
            }}
          />
        )}{" "}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });
