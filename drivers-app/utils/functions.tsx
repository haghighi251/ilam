import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

const apiUrl = Config.API_URL;

export async function RegisterOrLogin(mobile: string) {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: mobile,
    }),
  });
  if (!res.ok) {
    throw new Error("خطا در ارتباط با سرور.");
  }
  return res.json();
}

export async function CheckActivationCodeOnDB(mobile: string, code: string) {
  const res = await fetch(`${apiUrl}/api/auth/activation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: mobile,
      code: code,
    }),
  });
  if (!res.ok) {
    throw new Error("خطا در ارتباط با سرور.");
  }

  return res.json();
}

export async function saveLoggedInUserId(userId: string) {
  try {
    await AsyncStorage.setItem("userId", userId);
  } catch (error) {
    console.log("Error saving user ID:", error);
  }
}

export async function getLoggedInUserId(): Promise<string | null> {
  try {
    const userId = await AsyncStorage.getItem("userId");
    return userId;
  } catch (error) {
    console.log("Error retrieving user ID:", error);
    return null;
  }
}
