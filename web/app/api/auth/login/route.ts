import UsersSchema from "@/schemas/Users";
import UsersOptions from "@/schemas/UsersOptions";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { IUsersSchema, IUsersOptionsSchema } from "@/utils/types";
import connectMongo from "@/utils/connectMongo";

export async function POST(request: NextRequest) {
  try {
    await console.log(process.env.MONGO);
    await connectMongo();
    console.log(2);
    const randomNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const body = await request.json();
    let freeToSendSms = true;

    // We have to check if the request is for a new user or not.
    const user = await UsersSchema.findOne({
      $or: [
        { mobile: body.mobile },
        { username: body.mobile },
        { email: body.email },
      ],
    });

    if (user) {
      // The request belongs to a user who had been registered before.
      // Now we just need to update the activationCode and then we are free to send that code via sms
      await UsersSchema.findByIdAndUpdate(user._id, {
        $set: { activationCode: randomNumber },
      });
    } else {
      // The request is for a new user
      const newUser: IUsersSchema = new UsersSchema({
        mobile: body.mobile,
        status: false,
        activationCode: randomNumber,
      });

      // Hash password using bcrypt and save user to database
      const salt = bcrypt.genSaltSync(10);
      console.log(3);
      console.log(salt);
      // Save user to database
      await newUser
        .save()
        .then(async (savedUser: IUsersSchema) => {
          // Create a new user options document for the new user with initial credit value of 0
          const newOption: IUsersOptionsSchema = new UsersOptions({
            uid: savedUser._id,
            key: "credit",
            value: bcrypt.hashSync("0", salt),
          });
          // Save user options to database
          await newOption
            .save()
            .then(() => {})
            .catch((error) => {
              freeToSendSms = false;
            });
        })
        .catch((error) => {
          freeToSendSms = false;
        });
    }
    if (freeToSendSms) {
      // Now we are free to send activation sms to the user
      const smsServer = await fetch("http://ippanel.com/api/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          op: "pattern",
          user: "09918723808",
          pass: "Faraz@4490396341",
          fromNum: "+983000505",
          toNum: body.mobile,
          patternCode: "t0u131774dnx2mi",
          inputData: [{ code: randomNumber }],
        }),
      });

      const smsJsonResult = await smsServer.json();

      if (smsJsonResult.toString().length > 5) {
        return NextResponse.json({
          success: true,
          error: "",
          data: null,
        });
      } else {
        return NextResponse.json({
          success: false,
          error:
            "در فرایند ارسال پیامک خطایی رخ داده است. لطفا لحظاتی دیگر تلاش نمایید.",
          data: null,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      users: null,
    });
  }
}
