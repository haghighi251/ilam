"use client";
import React from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import School from "@mui/icons-material/School";
import LocalTaxi from "@mui/icons-material/LocalTaxi";
import FamilyRestroom from "@mui/icons-material/FamilyRestroom";
import Link from "next/link";
import { AccountBalance, Newspaper } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

const RightSide = () => {
  const routerPath = usePathname();

  // Function to check if a specific route is active
  const isRouteActive = (pathname: string) => {
    return routerPath === pathname;
  };

  return (
    <div className="basis-1/4 bg-white w-full h-screen">
      <Link href={`/admin/dashboard/`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <Dashboard sx={{ my: 0.3 }} />
            آمار
          </div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/admins`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/admins") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <School sx={{ my: 0.3 }} />
            ادمین ها
          </div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/provinces`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/provinces") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <School sx={{ my: 0.3 }} />
            استان ها
          </div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/cities`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/cities") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <School sx={{ my: 0.3 }} />
            شهر ها
          </div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/schools`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/schools") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <School sx={{ my: 0.3 }} />
            مدرسه ها
          </div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/drivers`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/drivers") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <LocalTaxi sx={{ my: 0.3 }} />
            مدیریت رانندگان
          </div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/parents`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/parents") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <FamilyRestroom sx={{ my: 0.3 }} />
            اولیا
          </div>
        </div>
      </Link>
      <Link href={`/`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <AccountBalance sx={{ my: 0.3 }} />
            حسابداری
          </div>
        </div>
      </Link>
      <Link href={`/admin/dashboard/news`}>
        <div className={`rightMenuLink ${isRouteActive("/admin/dashboard/news") ? "rightMenuLinkActive" : ""}`}>
          <div className="rightMenuLinkInternally">
            <Newspaper sx={{ my: 0.3 }} />
            اخبار
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RightSide;
