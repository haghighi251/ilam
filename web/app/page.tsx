"use client";
import FirstPageMap from "@/components/parents/FirstPageMap";
import { user } from "@/services/Redux/userReducer";
import { Iuser } from "@/utils/types";
import { useSelector } from "react-redux";

const HomePage = () => {
  const currentUser: Iuser = useSelector(user);

  return (
    <main className="w-full">
      {currentUser.user.isDriver === false && <FirstPageMap />}

      <p>این یک متن فارسی هستش.</p>
    </main>
  );
};

export default HomePage;
