// File: /components/projects/NewProject.tsx

"use client";

import React, { useState, ChangeEvent, JSX } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ----------------------------------------------------------------
// Zod Schema for Form Validation
// ----------------------------------------------------------------
// This schema validates the form data for creating a new project.
// It ensures that the title, description, and due date are provided.
const projectSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  dueDate: z.string().min(1, { message: "Due Date is required" }),
});

// ----------------------------------------------------------------
// Type Definitions
// ----------------------------------------------------------------

// Interface representing the structure of the project form data.
interface ProjectFormData {
  title: string;
  description: string;
  dueDate: string;
}

// Props interface for the NewProject component.
interface NewProjectProps {
  /**
   * onAdd is a callback function invoked when the user successfully
   * submits the form. It receives the new project data.
   */
  onAdd: (data: ProjectFormData) => void;
  /**
   * onCancel is a callback function invoked when the user decides to
   * cancel the project creation process.
   */
  onCancel: () => void;
}

// ----------------------------------------------------------------
// NewProject Component
// ----------------------------------------------------------------

/**
 * The NewProject component renders a form that allows users to create
 * a new project. It uses Zod for form validation and displays error
 * messages when required fields are missing.
 *
 * @param {NewProjectProps} props - Component properties including onAdd and onCancel callbacks.
 * @returns {JSX.Element} The rendered NewProject component.
 */
export function NewProject({ onAdd, onCancel }: NewProjectProps): JSX.Element {
  // Local state to manage the form data.
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    dueDate: "",
  });

  // Local state to store error messages for each form field.
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectFormData, string>>
  >({});

  /**
   * handleChange updates the formData state when the user types into the inputs.
   * It also clears any error message for the changed field.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event.
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    // Clear the error message for this field upon change.
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  /**
   * handleSubmit validates the form data using the Zod schema.
   * If validation fails, it sets the appropriate error messages.
   * If validation succeeds, it calls the onAdd callback with the form data.
   */
  const handleSubmit = (): void => {
    // Validate the form data against the schema.
    const validationResult = projectSchema.safeParse(formData);

    if (!validationResult.success) {
      // Build an errors object mapping each field to its error message.
      const fieldErrors: Partial<Record<keyof ProjectFormData, string>> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ProjectFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // If validation passes, call onAdd with the form data.
    onAdd(formData);
  };

  return (
    <div className="w-[35rem] max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200">
      {/* Header Section */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Create New Project
      </h2>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="text-gray-700">
            Title
          </Label>
          <Input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            className="mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <Label htmlFor="description" className="text-gray-700">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Type your project description here..."
            className="mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Due Date Field */}
        <div>
          <Label htmlFor="dueDate" className="text-gray-700">
            Due Date
          </Label>
          <Input
            type="date"
            id="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 my-4">
        {/* Cancel Button: Calls onCancel when clicked */}
        <Button
          variant="outline"
          className="hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </Button>
        {/* Save Button: Triggers handleSubmit to validate and submit the form */}
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
