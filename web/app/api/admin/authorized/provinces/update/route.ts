import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import Provinces from "@/schemas/Provinces";
import { IProvincesSchema } from "@/utils/types";

export async function PATCH(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();
    console.log(body)

    if (
      body.province === null ||
      body.province === undefined ||
      body.provinceUnique === null ||
      body.provinceUnique === undefined
    ) {
      return NextResponse.json({
        success: false,
        error: "اطلاعات برای ثبت صحیح نمی باشد.",
        data: null,
      });
    }

    const provinceData = await Provinces.findOneAndUpdate(
      { provinceUnique: body.provinceUnique },
      { $set: { provinceName: body.province } },
      { new: true }
    );

    if (!provinceData) {
      return NextResponse.json({
        success: false,
        error: "استانی با این شناسه وجود ندارد.",
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      error: null,
      data: provinceData,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
