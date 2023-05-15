"use client";
import { Iuser } from "@/utils/types";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "@/services/Redux/userReducer";

const TopMenu = () => {
  const currentUser: Iuser = useSelector(user);
  //const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex w-full flex-col md:flex-row p-3 md:p-5 bg-sky-300 gap-2">
      <Link href="/">شروع</Link>
      {currentUser.isLoggedIn !== false && (
        <>
          <Link href="/Login">خروج</Link>
        </>
      )}
      {currentUser.isLoggedIn === false && (
        <>
          <Link href="/Login">ورود</Link>
        </>
      )}
    </div>
  );
};

export default TopMenu;
