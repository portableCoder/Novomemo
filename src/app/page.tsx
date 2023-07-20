"use client";
import Bg from "@components/Bg";
import useStore from "@store/index";
import Link from "next/link";

export default function Page() {
  const setLocalMode = useStore((s) => s.setLocalMode);
  return (
    <main className="relative text-white w-screen h-screen  overflow-x-hidden">
      <div className="w-full h-full absolute top-0 left-0 md:-mx-64 transform">
        <Bg className="w-full h-full blur-3xl" />
      </div>
      <div
        style={{
          zIndex: 9999,
        }}
        className="absolute w-full h-full top-0 left-0"
      >
        <div className="text-3xl z-50 p-4">Novomemo</div>

        <div className="bg-transparent flex items-center justify-center w-full -my-6 h-full ">
          <div className="flex flex-col items-center justify-center  px-4">
            <div className=" flex flex-col gap-y-6 w-full md:w-1/2">
              <div>
                <div className="text-5xl md:text-6xl grad bg-clip-text text-transparent text-center">
                  All your notes.. None of the hassle
                </div>
                <div
                  className="text-lg md:text-xl w-full text-center first-letter:
                font-extrabold text-transparent  bg-clip-text bg-gradient-to-br from-zinc-300 to-zinc-600
                "
                >
                  Novomemo is a simple & easy to use note-taking app built on
                  top of open source technologies like Next.js and Supabase. It
                  supports markdown and editor based notes and labelling.
                </div>
              </div>
              <div className="whitespace-nowrap flex flex-col md:flex-row gap-y-3 basis-0 grow shrink gap-x-5 items-center justify-center">
                <button className="bg-indigo-500 p-4 rounded-3xl w-full">
                  <Link className="w-full h-full" href="/login">
                    {" "}
                    Log In
                  </Link>
                </button>
                <button className="p-4 bg-indigo-500  rounded-3xl w-full">
                  <Link
                    onClick={() => {
                      setLocalMode(true);
                    }}
                    className="w-full h-full"
                    href="/app"
                  >
                    Use without logging in (local)
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
