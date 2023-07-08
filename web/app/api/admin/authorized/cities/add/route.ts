import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import Cities from "@/schemas/Cities";
import { ICitiesSchema } from "@/utils/types";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();

    if (body.cityName === null || body.cityName === undefined || body.provinceUnique === null || body.provinceUnique === undefined )
      return NextResponse.json({
        success: false,
        error: "اطلاعات برای ثبت صحیح نمی باشد.",
        data: null,
      });
    

    // We have to check if the request is for a new city or not.
    const cityDataFromDB = await Cities.findOne(
      { cityName: body.cityName }
    );

    if (cityDataFromDB)
      return NextResponse.json({
        success: false,
        error: "نام این شهر قبلا وارد شده است.",
        data: null,
      });

    const randomNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    const newCity: ICitiesSchema = new Cities({
      cityName: body.cityName,
      cityUnique: randomNumber,
      provinceUnique: body.provinceUnique,
      speedMin: body.speedMin,
      speedMax: body.speedMax,
    });

    await newCity
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
