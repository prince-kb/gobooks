import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf",weight: "600",style: "normal"},
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src : [{path : '/fonts/BebasNeue-Regular.ttf',weight : "400",style : "normal" }],
  variable : '--bebas-neue'
})

export const metadata: Metadata = {
  title: "Go Books",
  description: "A book borrowing Library Management Solution.",
};

const RootLayout = ({ children}:{ children: ReactNode}) => {
  return (
    <html lang="en">
      <body className={` ${ibmPlexSans.className} ${bebasNeue.className}  antialiased`}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout
