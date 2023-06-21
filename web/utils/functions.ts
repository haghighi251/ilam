import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/services/Redux/store";
import { user } from "@/services/Redux/userReducer";
import { Iuser } from "@/utils/types";

export async function RedirectWhoAreNotAdmin() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const currentUser: Iuser = useSelector(user);
  if (currentUser.isLoggedIn === false || currentUser.user.isAdmin === false)
    router.push("/");
}
