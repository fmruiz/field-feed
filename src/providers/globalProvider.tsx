"use client";

import React, { createContext, useMemo, useState } from "react";
import { IGlobalContext } from "@/types/providers";

export const GlobalContext = createContext<IGlobalContext>({
  username: "",
  setUsername: () => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");

  const state = useMemo(
    () => ({
      setUsername,
      username,
    }),
    [setUsername, username]
  );

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
