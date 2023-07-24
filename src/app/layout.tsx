import "./globals.css";
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Novomemo </title>
      <meta property="og:title" content="Novomemo" />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/portableCoder/Novomemo/master/assets/Banner.png"
      />
      <meta property="og:description" content="A simple note-taking app" />
      <meta name="description" content="A simple note-taking app" />

      <link rel="shortcut icon" href="/Novomemo/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/Novomemo/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/Novomemo/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/Novomemo/favicon-16x16.png"
      />
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
