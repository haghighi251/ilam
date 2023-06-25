"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/services/Redux/store";
import { user } from "@/services/Redux/userReducer";
import { Iuser } from "@/utils/types";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const currentUser: Iuser = useSelector(user);
  console.log(currentUser);
  // This if function checks if the user is admin or not, if not redirects it to admin login page.
  if (currentUser.isLoggedIn === false || currentUser.user.isAdmin === false)
    router.push("/admin/login");
  else
    return (
      <div className="w-full bg-slate-100 h-screen">{children}</div>
    )
};

export default layout;
