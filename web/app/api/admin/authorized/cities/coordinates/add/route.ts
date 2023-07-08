import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import CityCoordinates from "@/schemas/CityCoordinates";
import { ICityCoordinatesSchema } from "@/utils/types";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();

    if (body.cityUnique === null || body.cityUnique === undefined || body.latitude === null || body.latitude === undefined || body.longitude === null || body.longitude === undefined)
      return NextResponse.json({
        success: false,
        error: "اطلاعات برای ثبت صحیح نمی باشد.",
        data: null,
      });

    // We have to check if the request is for a new cityCoordinate or not.
    const cityCoordinateDataFromDB = await CityCoordinates.findOne(
      { 
        cityUnique: body.cityUnique,
        latitude: body.latitude,
        longitude: body.longitude,
       }
    );

    if (cityCoordinateDataFromDB)
      return NextResponse.json({
        success: false,
        error: "نام این استان قبلا وارد شده است.",
        data: null,
      });

    const randomNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    const newCityCoordinates: ICityCoordinatesSchema = new CityCoordinates({
      cityCoordinateUnique: randomNumber,
      cityUnique: body.cityUnique,
      latitude: body.latitude,
      longitude: body.longitude,
      rowNumber: body.rowNumber,
    });

    await newCityCoordinates
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
