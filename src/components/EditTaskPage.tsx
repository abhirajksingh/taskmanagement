"use client";

// Import necessary hooks and components from Next.js
import { useState, useEffect, SetStateAction } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "./ui/input";

const EditTaskPage = () => {
  // Initialize useRouter hook
  const router = useRouter();

  // State for storing task data
  const [task, setTask] = useState(null);

  // State for updated title
  const [updatedTitle, setUpdatedTitle] = useState("");
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get search parameters from the URL
  const url = `${pathname}?${searchParams}`; // Construct URL from pathname and searchParams
  let id = url.substring(url.lastIndexOf("/") + 1).slice(0, -1); // Extract task ID from URL

  // Fetch task data from localStorage on component mount or when URL changes
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDataString = localStorage.getItem("tasks");
        if (!taskDataString) {
          throw new Error("Task data not found in localStorage");
        }
        const taskData = JSON.parse(taskDataString);

        const foundTask = await taskData.find(
          (item: { id: string }) => item.id === id
        );
        if (!foundTask) {
          throw new Error("Task not found with the given ID");
        }
        setTask(foundTask);
        setUpdatedTitle(foundTask.title);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchParams) {
      fetchTask();
    }
  }, [pathname, searchParams]);

  // Handler for updating the title input
  const handleTitleChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setUpdatedTitle(e.target.value);
  };

  // Handler for saving the updated task
  const handleSave = () => {
    let updatedTask = { ...(task ?? {}), title: updatedTitle };
    const taskDataString = localStorage.getItem("tasks");
    if (taskDataString) {
      const taskData = JSON.parse(taskDataString);
      const updatedTaskData = taskData.map((item: { id: string }) => {
        if (item.id === id) {
          return updatedTask;
        }
        return item;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTaskData));
    }
    router.push("/"); // Redirect to homepage after updating task
  };

  // Render loading message if task data is not yet loaded
  if (!task) {
    return <div>Loading...</div>;
  }

  // Render the form for updating task
  return (
    <div className=" m-auto p-5 sm:mx-auto  mx-5 sm:w-[50%] mt-10 bg-white/20 grid gap-5 border-2 border-solid border-gray-600 sm:p-10 rounded-xl">
      <h1 className="text-2xl">Update Task</h1>
      <Input
        id="text"
        placeholder="Add Task"
        type="text"
        value={updatedTitle}
        onChange={handleTitleChange}
      />
      <button
        className="bg-gradient-to-br px-3 py-2 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800  text-white rounded-md font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
        onClick={handleSave}
      >
        Update Task
        <BottomGradient />
      </button>
    </div>
  );
};

export default EditTaskPage;

// Component for rendering gradient effect at bottom of button
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
