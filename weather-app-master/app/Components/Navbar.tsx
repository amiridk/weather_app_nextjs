"use client";
import { Button } from "@/components/ui/button";

import React from "react";

import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";
import { Home, LogOut, UserCheck } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  const { state } = useGlobalContext();
  const { data: session, status } = useSession();

  return (
    <div className="w-full py-4 flex items-center justify-between  ">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard">
                <Button className="source-code-btn flex items-center gap-2">
                  <UserCheck /> داشبورد
                </Button>
              </Link>

              <form
                action={() => {
                  signOut();
                }}
              >
                <Button
                  variant="destructive"
                  className="source-code-btn flex items-center gap-2    "
                >
                  <LogOut /> خروج
                </Button>
              </form>
            </>
          ) : (
            <Link href={`/register`}>
              <Button className="source-code-btn flex items-center gap-2">
                <UserCheck /> عضویت
              </Button>
            </Link>
          )}
          <Link href="/">
            <Button className="source-code-btn flex items-center gap-2">
              <Home /> خانه
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
