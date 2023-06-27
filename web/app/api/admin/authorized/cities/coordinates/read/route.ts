import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import CityCoordinates from "@/schemas/CityCoordinates";
import { ICityCoordinatesSchema } from "@/utils/types";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    // Fetch all provinces
    const cityCoordinateDataFromDB = await CityCoordinates.find();

    return NextResponse.json({
      success: true,
      error: null,
      data: cityCoordinateDataFromDB,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
