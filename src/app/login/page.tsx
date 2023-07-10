"use client";
import { Input } from "@components/Input";
import React from "react";
import { useState, useEffect } from "react";

import { Session, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuth from "@util/useAuth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import useStore from "@store/index";
const page = () => {
  const session = useAuth();
  const supabase = useStore((s) => s.supabase);
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className=" rounded-md my-auto flex items-center">
        <Auth
          providers={[]}
          supabaseClient={supabase}
          appearance={{
            extend: false,

            className: {
              container:
                "flex flex-col gap-y-3 w-full  rounded-md p-4 items-center justify-center text-white",
              label: "block",
              button: "p-4 rounded-md bg-indigo-600 w-full",
              message:
                "w-full text-center  flex items-center justify-center text-red-500",
              input:
                "focus:border-indigo-700 w-full focus:outline-none  block text-white p-4 bg-transparent border-2 border-zinc-600 rounded-md ",
            },
          }}
        />{" "}
      </div>
    </div>
  );
};

export default page;
