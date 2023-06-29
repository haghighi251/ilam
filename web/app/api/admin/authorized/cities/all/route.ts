import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Cities from "@/schemas/Cities";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    // Fetch all cities
    const cityDataFromDB = await Cities.find();

    return NextResponse.json({
      success: true,
      error: null,
      data: cityDataFromDB,
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
