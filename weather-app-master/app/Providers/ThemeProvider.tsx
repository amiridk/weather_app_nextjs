"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { GlobalContextProvider } from "@/app/context/globalContext";
import { SessionProvider } from "next-auth/react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
