import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import CityCoordinates from "@/schemas/CityCoordinates";
import { ICityCoordinatesSchema } from "@/utils/types";

export async function PATCH(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();
    console.log(body)

    if (
      body.cityCoordinateUnique === null ||
      body.cityCoordinateUnique === undefined ||
      body.cityUnique === null ||
      body.cityUnique === undefined ||
      body.latitude === null ||
      body.latitude === undefined ||
      body.longitude === null ||
      body.longitude === undefined
    ) {
      return NextResponse.json({
        success: false,
        error: "اطلاعات برای ثبت صحیح نمی باشد.",
        data: null,
      });
    }

    const cityCoordinateData = await CityCoordinates.findOneAndUpdate(
      { cityCoordinateUnique: body.cityCoordinateUnique },
      { $set: { 
        latitude: body.latitude, 
        longitude: body.longitude,
        rowNumber: body.rowNumber,
      } },
      { new: true }
    );

    if (!cityCoordinateData) {
      return NextResponse.json({
        success: false,
        error: "مختصاتی با این شناسه وجود ندارد.",
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      error: null,
      data: cityCoordinateData,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
