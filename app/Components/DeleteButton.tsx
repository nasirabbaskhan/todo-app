"use client";
import { Trash2 } from "lucide-react";
import { NextResponse } from "next/server";
import refreshData from "../lib/utils/refresh";

export default function DeleteButton(props: { id: number }) {
  const id = props.id;
  const deleteHandler = async () => {
    try {
      if (id) {
        const res = fetch("http://localhost:3000/api/todo", {
          method: "DELETE",
          body: JSON.stringify({
            id: id,
          }),
        });

        await refreshData();
      } else {
        throw new Error("ID is not provided");
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        message: (error as { message: string }).message,
      });
    }
  };

  return (
    <div>
      <Trash2 onClick={deleteHandler} className="cursor-pointer" />
    </div>
  );
}
