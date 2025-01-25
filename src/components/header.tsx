import React from "react";
import Logo from "./icons/logo";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-center h-[83px] w-full">
      <Link href={"/"}>
        <Logo />
      </Link>
    </div>
  );
};

export default Header;
