"use client";
import { LoadingModal } from "@components/Modal";
import useStore from "@store/index";
import useAuth from "@util/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = useAuth();
  const router = useRouter();
  const [localMode, setLocalMode] = useStore(({ localMode, setLocalMode }) => [
    localMode,
    setLocalMode,
  ]);
  useEffect(() => {
    if (!session && !localMode) {
      router.push("/login");
    }
    if (session) {
      setLocalMode(false);
    }
  }, [session]);
  const [loading] = useStore((s) => [s.globalLoading]);
  return (
    <>
      {loading && <LoadingModal />}
      {children}
    </>
  );
}
