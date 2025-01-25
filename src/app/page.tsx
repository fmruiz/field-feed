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
    <main className="flex justify-center  h-full flex-col gap-8 items-center">
      <div className="flex flex-col justify-center items-center gap-[15px]">
        <Logo className="w-[300px] sm:w-[435px]" height="200" />

        <div className="flex justify-center items-center gap-2 w-[300px]">
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
  );
}

