"use client";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Poppins } from "next/font/google";
import useStore from "@store/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@util/useAuth";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
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
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
