import UsersSchema from "@/schemas/Users";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();

    // We have to check if the request is for a new user or not.
    const user = await UsersSchema.findOne({
      $or: [
        { mobile: body.usernameOrEmail, isAdmin: true },
        { username: body.usernameOrEmail, isAdmin: true },
        { email: body.usernameOrEmail, isAdmin: true },
      ],
    });

    if (user) {
      // We have to check the password
      const correctPassword = await bcrypt.compare(
        body.password,
        user.password
      );
      if (!correctPassword) {
        return NextResponse.json({
          success: false,
          error: "اطلاعات برای ورود صحیح نمی باشد.",
          data: null,
        });
      }

      return NextResponse.json({
        success: true,
        error: "",
        data: {
          user_id: user._id,
          isAdmin: user.isAdmin, // For security reasons, we don't pass the database isAdmin field here.
          isDriver: user.isDriver,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "کاربری با مشخصات شما پیدا نشد.",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
