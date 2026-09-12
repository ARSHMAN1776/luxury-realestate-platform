import { NextRequest, NextResponse } from "next/server";
import { getPropertyById, updateProperty, deleteProperty } from "@/lib/db";

type Props = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const property = getPropertyById(id);
    if (!property) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: property });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updateProperty(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const deleted = deleteProperty(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Property deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
