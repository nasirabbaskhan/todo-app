// import Image from 'next/image'
import Navbar from "./Components/Navbar";
import TodoForm from "./views/todoForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <TodoForm />
    </>
  );
}
