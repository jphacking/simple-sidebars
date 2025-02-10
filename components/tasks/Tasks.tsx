// File: /components/tasks/Tasks.tsx

"use client";

import React, { JSX } from "react";
import NewTasks from "@/components/tasks/NewTasks"; // Component for creating a new task

// ----------------------
// Type Definitions
// ----------------------

// Interface representing a single Task object.
export interface Task {
  id: number;
  text: string;
}

// Props for the Tasks component.
interface TasksProps {
  // An array of task objects to display.
  tasks: Task[];
  // Callback function to add a new task. Receives the task text as an argument.
  onAdd: (text: string) => void;
  // Callback function to delete a task. Receives the task id as an argument.
  onDelete: (id: number) => void;
}

// ----------------------
// Tasks Component
// ----------------------

/**
 * The Tasks component is responsible for displaying a list of tasks for a project,
 * providing a form to add new tasks, and allowing the removal of existing tasks.
 *
 * @param {TasksProps} props - Component properties.
 * @returns {JSX.Element} The rendered tasks section.
 */
export default function Tasks({
  tasks,
  onAdd,
  onDelete,
}: TasksProps): JSX.Element {
  return (
    <section>
      {/* Title for the tasks section */}
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      {/* Render the NewTask component for adding new tasks */}
      <NewTasks onAdd={onAdd} />

      {/* Conditional rendering: Display a message if no tasks exist */}
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}

      {/* Conditional rendering: If tasks exist, display them in a styled list */}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              {/* Button to delete the task */}
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
