"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      name: "HR Panel",
      link: "hrPanel",
    },
  ];

  return (
    <>
      <div
        className="flex justify-between items-center w-full h-20
       px-4 text-white bg-transparent fixed nav z-50 ml-20"
      >
        <ul className="hidden md:flex">
          {links.map((link, id) => (
            <li
              key={id}
              className="text-lg nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            >
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4  text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>
      {nav && (
        <ul className="text-lg flex flex-col justify-center items-center fixed w-full h-full top-0 left-0 bg-black text-gray-500 z-30">
          {links.map((link, id) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Navbar;
