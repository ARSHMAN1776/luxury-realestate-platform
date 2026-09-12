import { NextRequest, NextResponse } from "next/server";
import { filterProperties, createProperty, getAllProperties } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || undefined;
    const category = searchParams.get("category") || undefined;
    const country = searchParams.get("country") || undefined;
    const city = searchParams.get("city") || undefined;
    const status = searchParams.get("status") || undefined;
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const bedrooms = searchParams.get("bedrooms") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const nearLat = searchParams.get("nearLat") ? Number(searchParams.get("nearLat")) : undefined;
    const nearLng = searchParams.get("nearLng") ? Number(searchParams.get("nearLng")) : undefined;
    const maxDistanceKm = searchParams.get("maxDistanceKm") ? Number(searchParams.get("maxDistanceKm")) : undefined;

    const results = filterProperties({
      query,
      category,
      country,
      city,
      status,
      minPrice,
      maxPrice,
      bedrooms,
      sort,
      nearLat,
      nearLng,
      maxDistanceKm,
    });

    return NextResponse.json({
      success: true,
      count: results.length,
      total: getAllProperties().length,
      data: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.category || !body.price || !body.location?.city) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, category, price, location.city" },
        { status: 400 }
      );
    }

    const created = createProperty(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create property" },
      { status: 500 }
    );
  }
}
