"use client";
import Link from "next/link";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

interface Task {
  title: string;
  id: string;
  isDone: boolean;
}

const Table = () => {
  // State variables
  const [tasks, setTasks] = useState<Task[]>([]); // Specify the type for tasks
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");

  // useEffect to load tasks from localStorage on component mount
  useEffect(() => {
    const taskDataString = localStorage.getItem("tasks");
    const taskData = taskDataString ? JSON.parse(taskDataString) : [];
    setTasks(taskData);
  }, []);

  // Function to add a new task
  const addNewTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [
        ...tasks,
        { title: newTask, id: uuid(), isDone: false },
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  // Function to delete a task
  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Function to mark a task as done
  const markAsDone = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Filtered tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-[95%] sm:w-[60%] sm:m-auto mx-3 pt-10 text-black dark:text-white bg-white dark:bg-black">
      <p className="py-2 font-semibold text-2xl pl-2">Tasks</p>

      {/* Task Container */}
      <div className="border border-gray-700 rounded-lg divide-y divide-gray-500 dark:border-gray-700 dark:divide-gray-700">
        <div className="py-3 px-2  sm:flex justify-between items-center">
          {/* Search Input */}
          <div className=" mb-3">
            <Input
              id="text"
              placeholder="Search For Task"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Add Task Input */}
          <div className=" flex gap-1 justify-between items-center">
            <Input
              id="text"
              placeholder="Add Task"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="bg-gradient-to-br px-3 py-2 w-[50%] sm:w-[30%] relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800  text-white rounded-md font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              onClick={addNewTask}
            >
              Add
              {/* Bottom Gradient Effect */}
              <BottomGradient />
            </button>
          </div>
        </div>
        {/* Task Table */}
        <table className="min-w-full divide-y divide-gray-500 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th></th>
              <th
                scope="col"
                className="sm:px-6 px-1 py-2 sm:py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                Title
              </th>
              <th
                scope="col"
                className="sm:px-6 px-1 py-2 sm:py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                Status
              </th>

              <th
                scope="col"
                className="sm:px-6 px-2 py-3 sm:py-3 text-end text-xs font-medium text-gray-500 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="sm:divide-y divide-gray-200 dark:divide-gray-700">
            {/* Render each task */}
            {filteredTasks.map(
              (task: { id: string; title: string; isDone: boolean }) => (
                <tr key={task.id}>
                  {/* Checkbox for marking task as done */}
                  <td className="sm:px-6 px-1 py-3">
                    <div className="flex items-center h-5">
                      <input
                        id={task.id}
                        type="checkbox"
                        className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        checked={task.isDone}
                        onChange={() => markAsDone(task.id)}
                      />
                    </div>
                  </td>

                  <td
                    className={` ${
                      task.isDone === true
                        ? "line-through text-gray-600 decoration-2"
                        : "no-underline"
                    } sm:px-6 px-1 py-3 whitespace-nowrap overflow-hidden text-sm font-medium text-black/90 dark:text-gray-200`}
                  >
                    {task.title}
                  </td>
                  <td className="sm:px-6 px-1 py-3 whitespace-nowrap text-sm font-medium text-black/90 dark:text-gray-200">
                    {task.isDone === true ? "Completed" : "Pending"}
                  </td>

                  <td className="sm:px-6 px-1 py-3 whitespace-nowrap text-end text-sm font-medium">
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
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

// Component for rendering gradient effect at bottom of button
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
