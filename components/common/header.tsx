"use client";
import { FileText } from "lucide-react";
import React from "react";
import NavLink from "./nav-link";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ProBadge from "./pro-badge";

const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-4 mx-auto">
      <div className="flex lg:flex-1 ">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:2-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="text-gray-900 font-bold">Sommaire</span>
        </NavLink>
      </div>
      <div className=" flex lg:justify-center gap-4 lg:gap-14 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">dashborad</NavLink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1 ">
        <SignedIn>
          <div className="flex gap-2 items-center ">
            <NavLink href="/upload">Upload a pdf</NavLink>
            <ProBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">SignIn</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
