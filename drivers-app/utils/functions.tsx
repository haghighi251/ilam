import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function RegisterOrLogin(mobile: string) {
   try {
      console.log(API_URL);
      const res = await fetch(`${API_URL}/api/auth/login`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            mobile: mobile,
         }),
      });

      if (!res.ok) {
         throw new Error('خطا در ارتباط با سرور.');
      }

      return res.json();
   } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to be handled by the caller
   }
}

export async function CheckActivationCodeOnDB(mobile: string, code: string) {
   const res = await fetch(`${API_URL}/api/auth/activation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         mobile: mobile,
         code: code,
      }),
   });
   if (!res.ok) {
      throw new Error('خطا در ارتباط با سرور.');
   }

   return res.json();
}

export async function saveLoggedInUserId(userId: string) {
   try {
      await AsyncStorage.setItem('userId', userId);
   } catch (error) {
      console.log('Error saving user ID:', error);
   }
}

export async function getLoggedInUserId(): Promise<string | null> {
   try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
   } catch (error) {
      console.log('Error retrieving user ID:', error);
      return null;
   }
}

// To get students information in drivers app
export async function getStudentsInformations(driverUnique: string) {
   const url = `${API_URL}/api/admin/authorized/students/filter/driver/${driverUnique}`;
   const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
   });
   if (!res.ok) {
      throw new Error('خطا در ارتباط با سرور.');
   }

   return res.json();
}
