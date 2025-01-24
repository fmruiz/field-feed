"use client";

import Link from "next/link";
import Logo from "@/components/icons/logo";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/providers/globalProvider";
import { useContext, useState } from "react";

export default function Home() {
  const [usernameValue, setUsernameValue] = useState<string>("");
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
              onChange={(e) => setUsernameValue(e.target.value)}
            />
            <Link
              className="h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90"
              href={"/feed"}
              onClick={handleUsername}
            >
              GO!
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

