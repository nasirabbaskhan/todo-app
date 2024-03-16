"use client";
import { useState } from "react";
import { NewTodo } from "../lib/drizzle";

import refreshData from "../lib/utils/refresh";
// import { lucide-chevron-right-circle } from "lucide-react";

export default function Addtodo() {
  const [task, setTask] = useState<NewTodo | string>("");

  const onclickHandler = async () => {
    try {
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({
            task: task,
          }),
        });

        await refreshData();
      }
    } catch (error) {
      console.log("Error Message", error);
    }
  };
  return (
    <div>
      <form className="flex gap-4 items-center mt-7">
        <input
          onChange={(e) => setTask(e.target.value)}
          className=" border-2 border-secondary rounded-full w-full py-3 px-5 focus:outline-none"
          type="text"
        />
        <button
          type="button"
          onClick={onclickHandler}
          className="h-11 w-14 bg-gradient-to-tr from-primary to-secondary rounded-full px-2 py-6 flex items-center"
        >
          <p className="font-bold text-white">Add</p>
        </button>
      </form>
    </div>
  );
}
