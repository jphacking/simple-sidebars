// File: /components/projects/SelectedProjects.tsx

"use client";

import React, { JSX } from "react";
import { Button } from "@/components/ui/button";
import Tasks from "@/components/tasks/Tasks"; // Importing the Tasks component

// ----------------------
// Type Definitions
// ----------------------

// Interface representing a Task object.
export interface Task {
  id: number;
  text: string;
  projectId: number;
}

// Interface representing a Project object.
export interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

// Props for the SelectedProject component.
interface SelectedProjectProps {
  project: Project;
  onDelete: () => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  tasks: Task[];
}

// ----------------------
// SelectedProject Component
// ----------------------

/**
 * Component to display a selected project with its details and associated tasks.
 *
 * @param {SelectedProjectProps} props - Component properties.
 * @returns {JSX.Element} The rendered component.
 */
export function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}: SelectedProjectProps): JSX.Element {
  // If the project is not found, render a fallback message.
  if (!project) {
    return <p className="text-center text-gray-500">Project not found.</p>;
  }

  // Format the due date to a more readable string format.
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200">
      {/* Header section containing the project title, due date, and description */}
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{project.title}</h1>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>

      {/* Tasks component for displaying and managing tasks */}
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />

      {/* Button to delete the current project */}
      <div className="flex items-center justify-end gap-4 my-4">
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onDelete}
        >
          Delete Project
        </Button>
      </div>
    </div>
  );
}
