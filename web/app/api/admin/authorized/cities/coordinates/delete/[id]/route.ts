import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import CityCoordinates from "@/schemas/CityCoordinates";
import { ICityCoordinatesSchema } from "@/utils/types";

export async function DELETE(request: NextRequest, {params}) {
  try {
    await connectMongo();

    if (params.id === null || params.id === undefined)
      return NextResponse.json({
        success: false,
        error: "برای حذف صحیح، کد شناسایی یا نام استان ارسال نشده است.",
        data: null,
      });

    // Find the document to delete by cityCoordinateUnique
    const cityCoordinateDataFromDB = await CityCoordinates.findOneAndDelete({
      cityCoordinateUnique: params.id,
    });

    if (!cityCoordinateDataFromDB)
      return NextResponse.json({
        success: false,
        error: "استانی با این کد شناسایی یافت نشد.",
        data: null,
      });

    return NextResponse.json({
      success: true,
      error: null,
      data: null,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
