import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import Cities from "@/schemas/Cities";
import { ICitiesSchema } from "@/utils/types";

export async function PATCH(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();
    console.log(body)

    if (
      body.cityName === null || body.cityName === undefined || body.cityUnique === null || body.cityUnique === undefined 
    ) {
      return NextResponse.json({
        success: false,
        error: "اطلاعات برای ثبت صحیح نمی باشد.",
        data: null,
      });
    }

    const cityData = await Cities.findOneAndUpdate(
      { cityUnique: body.cityUnique },
      { $set: { cityName: body.city, provinceUnique: body.provinceUnique, speedMin: body.speedMin, speedMax: body.speedMax } },
      { new: true }
    );

    if (!cityData) {
      return NextResponse.json({
        success: false,
        error: "استانی با این شناسه وجود ندارد.",
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      error: null,
      data: cityData,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
