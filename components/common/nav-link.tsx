"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname !== "/" && pathname.startsWith(`${href}/`)); // if pathname is active or not active
  return (
    <Link
      className={
        cn(
          "transition duration-200 text-gray-600 ease-in-out hover:text-rose-500" +
            " " +
            className,
          isActive && "text-rose-500"
        ) || ""
      }
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
