import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Provinces from "@/schemas/Provinces";

export async function GET(request: NextRequest,{params}) {
  try {
    await connectMongo();
    // Fetch all provinces
    const provinceDataFromDB = await Provinces.findOne({ provinceUnique: params.id});
    return NextResponse.json({
      success: true,
      error: null,
      data: provinceDataFromDB.provinceName,
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
