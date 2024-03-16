import { NextRequest, NextResponse } from "next/server";
import { todoTable, db } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm";
import { error } from "console";

export async function GET(request: NextRequest) {
  try {
    const res = await db.select().from(todoTable);

    return NextResponse.json({ data: res });
  } catch (err) {
    console.log((err as { message: string }).message);
    return NextResponse.json({
      message: (err as { message: string }).message,
    });
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    if (req.task) {
      const data = await db
        .insert(todoTable)
        .values({ task: req.task })
        .returning();
      return NextResponse.json({ message: data });
    } else {
      throw new Error("Task field is required");
    }
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.id) {
      const res = await db
        .delete(todoTable)
        .where(eq(todoTable.id, req.id))
        .returning();
      return NextResponse.json({ data: res });
    } else {
      throw new Error("Id is missing");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}
