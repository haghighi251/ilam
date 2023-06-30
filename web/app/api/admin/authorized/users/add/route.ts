import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import Provinces from "@/schemas/Provinces";
import { IProvincesSchema } from "@/utils/types";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();

    if (body.province === null || body.province === undefined)
      return NextResponse.json({
        success: false,
        error: "اطلاعات برای ثبت صحیح نمی باشد.",
        data: null,
      });

    // We have to check if the request is for a new province or not.
    const provinceDataFromDB = await Provinces.findOne(
      { provinceName: body.province }
    );

    if (provinceDataFromDB)
      return NextResponse.json({
        success: false,
        error: "نام این استان قبلا وارد شده است.",
        data: null,
      });

    const randomNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    const newProvince: IProvincesSchema = new Provinces({
      provinceName: body.province,
      provinceUnique: randomNumber,
    });

    await newProvince
      .save()
      .then(() => {
        return NextResponse.json({
          success: true,
          error: null,
          data: null,
        });
      })
      .catch(() => {
        return NextResponse.json({
          success: false,
          error:
            "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
          data: null,
        });
      });

    return NextResponse.json({
      success: true,
      error: null,
      data: null,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
