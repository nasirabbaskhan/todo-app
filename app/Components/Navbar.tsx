import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-slate-600">
        <ul className="flex space-x-4 py-2 text-white">
          <li className="text-1xl mx-4 cursor-pointer">TODO APP</li>
          <Link href={"/"}>
            <li className="cursor-pointer">Home</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
