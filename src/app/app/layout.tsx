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
  useEffect(() => {
    if (!session) {
      router.push("/login");
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
