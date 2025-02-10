// File: /components/tasks/NewTasks.tsx

"use client";

import React, { useState, ChangeEvent, FormEvent, JSX } from "react";

// ----------------------
// Type Definitions
// ----------------------

// Props interface for the NewTask component.
interface NewTaskProps {
  // Callback function to add a new task.
  onAdd: (text: string) => void;
}

// ----------------------
// NewTask Component
// ----------------------

/**
 * NewTask component provides an input field and a submit button to allow users
 * to add a new task. It leverages a form element to improve accessibility and
 * enables submission via the "Enter" key.
 *
 * @param {NewTaskProps} props - The component's props.
 * @returns {JSX.Element} The rendered NewTask component.
 */
export default function NewTask({ onAdd }: NewTaskProps): JSX.Element {
  // Local state to keep track of the task text entered by the user.
  const [enteredTask, setEnteredTask] = useState<string>("");

  /**
   * Handler for input field changes. Updates the enteredTask state with the
   * current value of the input.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The change event from the input field.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEnteredTask(event.target.value);
  };

  /**
   * Handler for form submission. Prevents the default form behavior, validates
   * the input, calls the onAdd callback with the entered task, and then clears the input.
   *
   * @param {FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevent the form from reloading the page.
    // Do nothing if the input is empty or only contains whitespace.
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd(enteredTask); // Call the parent handler with the new task text.
    setEnteredTask(""); // Clear the input field after adding the task.
  };

  return (
    // Using a form to allow submission via the Enter key.
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Enter new task"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        type="submit"
        className="text-stone-700 hover:text-stone-950 font-medium"
      >
        Add Task
      </button>
    </form>
  );
}
