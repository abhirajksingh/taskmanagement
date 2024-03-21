"use client";
import Link from "next/link";
import { Input } from "./ui/input";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const Table = () => {
  const [tasks, setTasks] = useState([
    { title: "Sample task", id: uuid(), isDone: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  let addNewTask = () => {
    setTasks((prevTasks) => {
      return [...prevTasks, { title: newTask, id: uuid(), isDone: false }];
    });
    setNewTask("");
  };

  const deleteTask = (id: React.ReactNode) => {
    setTasks((prevTasks) => tasks.filter((prevTasks) => prevTasks.id != id));
  };

  let marksAsDone = (id: React.ReactNode) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            isDone: true,
          };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="flex flex-col w-[60%] m-auto pt-10">
      <p className="py-2 font-semibold text-2xl pl-2">Tasks</p>
      <div className="border-2 border-gray-700 rounded-lg divide-y divide-gray-500 dark:border-gray-700 dark:divide-gray-700">
        <div className="py-3 px-4  flex justify-between items-center">
          <form className="">
            <Input
              id="text"
              placeholder="Search For Task"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className=" flex  justify-between items-center">
            <Input
              id="text"
              placeholder="Add Task"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="bg-gradient-to-br px-3 py-2 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800  text-white rounded-md font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              onClick={addNewTask}
            >
              Add
              <BottomGradient />
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-500 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th></th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks
              .filter((task) => {
                let searchTerm = search.toLowerCase();
                return task.title.toLowerCase().includes(searchTerm);
              })
              .map((task) => (
                <tr key={task.id}>
                  <td className="py-3 ps-4">
                    <div className="flex items-center h-5">
                      <input
                        id={task.id}
                        type="checkbox"
                        className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        checked={task.isDone}
                        onChange={() => marksAsDone(task.id)}
                      />
                    </div>
                  </td>

                  <td
                    className={` ${
                      task.isDone === true
                        ? "line-through text-gray-600 decoration-2"
                        : "no-underline"
                    } px-6 py-4 whitespace-nowrap text-sm font-medium text-black/90 dark:text-gray-200`}
                  >
                    {task.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black/90 dark:text-gray-200">
                    {task.isDone === true ? "Completed" : "Pending"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <form action="" className=" inline-block mr-5">
                      <Link
                        href={`/task/edit/${task.id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 font-semibold"
                      >
                        Edit
                      </Link>
                    </form>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-semibold mr-5"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="py-1 px-4 text-white">Pagination</div>
      </div>
    </div>
  );
};

export default Table;
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
