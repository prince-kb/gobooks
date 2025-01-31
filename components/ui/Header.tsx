import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { signOut } from "@/auth";

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5 font-ibm-plex-sans">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" height={40} width={40}></Image>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <form action={async () => {
              "use server";
              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
