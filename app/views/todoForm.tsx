import Addtodo from "../Components/Addtodo";
import Todolist from "../Components/todolist";

export const getTasksFromTable = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/todo", {
      cache: "no-cache",
    });
    const tasks = res.json();

    return tasks;
  } catch (error) {
    console.log((error as { message: string }).message);
  }
};

export default async function TodoForm() {
  const task = await getTasksFromTable();

  return (
    <div className="">
      <main className="bg-gradient-to-tr from-primary to-secondary h-screen flex items-center justify-center">
        <div className=" px-8 py-6 bg-slate-100 max-w-md  w-full rounded-xl">
          <div className="max-h-[350px] overflow-auto">
            {task.data.map((item: any) => {
              return (
                <div key={item.id}>
                  <Todolist task={item.task} id={item.id} />
                </div>
              );
            })}
          </div>

          <Addtodo />
        </div>
      </main>
    </div>
  );
}