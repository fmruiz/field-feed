"use client";

import Link from "next/link";
import Logo from "@/components/icons/logo";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/providers/globalProvider";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const { setUsername } = useContext(GlobalContext);

  const handleUsername = () => {
    if (usernameValue !== "") {
      setUsername(usernameValue);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-center h-full flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-[15px]">
          <Logo width="435" height="200" />

          <div className="flex items-center gap-2">
            <label className="sr-only">Enter your username</label>
            <Input
              placeholder="Enter your name..."
              onChange={(e) => {
                setDisabledBtn(false);
                setUsernameValue(e.target.value);
              }}
            />
            <Button className="py-0 px-0" disabled={disabledBtn}>
              <Link
                className="w-full h-full px-4 py-2"
                href={"/feed"}
                onClick={handleUsername}
              >
                GO!
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

