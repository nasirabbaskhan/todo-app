import DeleteButton from "./DeleteButton";

export default function Todolist(props: { task: string; id: number }) {
  return (
    <div className="">
      <div className="bg-white py-2 px-3 flex gap-3 gap-y-4 items-center justify-between shadow rounded-lg mb-4">
        <div className="flex justify-center items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-secondary"></div>
          <div className="text-lg font-medium">{props.task}</div>
        </div>
        <DeleteButton id={props.id} />
      </div>
    </div>
  );
}
