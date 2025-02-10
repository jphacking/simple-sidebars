// File: /components/projects/NoProjectSelected.tsx

"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import noProjectImage from "@/assets/no-projects.png";

// ----------------------
// Type Definitions
// ----------------------

// Interface for the component props.
interface NoProjectSelectedProps {
  /**
   * Callback function to initiate the creation of a new project.
   */
  onStartAddProject: () => void;
}

// ----------------------
// NoProjectSelected Component
// ----------------------

/**
 * The NoProjectSelected component displays a friendly message,
 * an image, and a button when no project is currently selected.
 * It encourages the user to select an existing project or create a new one.
 *
 * @param {NoProjectSelectedProps} props - The component's props.
 * @returns {JSX.Element} The rendered NoProjectSelected component.
 */
export function NoProjectSelected({
  onStartAddProject,
}: NoProjectSelectedProps): JSX.Element {
  return (
    <div className="w-[35rem] max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200">
      {/* Image displayed to represent "no project selected" */}
      <Image
        src={noProjectImage}
        alt="No Project"
        className="w-16 h-16 object-contain mx-auto"
      />

      {/* Title indicating that no project is selected */}
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>

      {/* Descriptive text encouraging project selection or creation */}
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one.
      </p>

      {/* Button that, when clicked, triggers the onStartAddProject callback */}
      <div className="flex items-center justify-end gap-4 my-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onStartAddProject}
        >
          Create new project
        </Button>
      </div>
    </div>
  );
}
