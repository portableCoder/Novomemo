"use client";
import { Input } from "@components/Input";
import useStore from "@store/index";
import createClient from "@util/createClient";
import useAuth from "@util/useAuth";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type Inputs = {
  password: string;
  passwordConfirm: string;
};
const Reset = () => {
  const [{ password, passwordConfirm }, setVal] = useState<Inputs>({
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    if (password !== passwordConfirm) {
      setError("Passwords must be equal");
      return;
    }
    if (!window.location.hash) {
      router.push("/login");
      return;
    }
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (evt, session) => {
      if (evt === "PASSWORD_RECOVERY") {
        subscription.unsubscribe();
        try {
          await supabase.auth.updateUser({
            password,
          });
          await supabase.auth.signOut();
        } catch (e) {
          setError("Error resetting password, please try again.. ");
          return;
        }
        setSuccess("Successfully reeset password, redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    });
  };
  const errorStyle = clsx({
    "border border-2 border-red-500 outline-none": error !== null,
  });
  const success_style = clsx({
    "border-green-400 bg-opacity-50 bg-green-500": success !== null,
  });
  const error_style = clsx({
    "border-red-400 bg-opacity-50 bg-red-500": error !== null,
  });
  return (
    <div className="w-screen h-screen text-white flex items-center justify-center">
      <div className="flex items-center justify-center  flex-col gap-y-3  px-8 md:w-1/4  w-full ">
        <div className=" text-2xl md:text-4xl w-fit text-left ">
          Reset password
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center w-full"
        >
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            className={errorStyle}
            placeholder="Password"
            onChange={(e) =>
              setVal({ password: e.currentTarget.value, passwordConfirm })
            }
          />

          <Input
            value={passwordConfirm}
            type="password"
            className={errorStyle}
            required
            minLength={8}
            placeholder="Confirm Password"
            onChange={(e) =>
              setVal({
                password,
                passwordConfirm: e.currentTarget.value,
              })
            }
          />

          <input
            className="btn w-full"
            type="submit"
            value={"Reset password"}
          />
          {error && <div className="text-xl">{error}</div>}
        </form>
        {(error && error !== "Passwords must be equal") ||
          (success && (
            <div
              className={`w-full border ${success_style} ${error_style}  rounded-md p-4 flex items-center justify-center text-xl`}
            >
              {error || success}
            </div>
          ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Reset), { ssr: false });
