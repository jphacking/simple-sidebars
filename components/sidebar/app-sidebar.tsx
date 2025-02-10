// File: /components/sidebar/app-sidebar.tsx

"use client";

import React, { JSX } from "react";
import Link from "next/link";

import { SquarePlus, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// ----------------------
// Type Definitions
// ----------------------

// Interface representing a project with a unique id and a title.
export interface Project {
  id: number;
  title: string;
}

// Props for the AppSidebar component.
interface AppSidebarProps {
  // Callback triggered when the user clicks the "Add Project" button.
  onStartAddProject: () => void;
  // Array of projects to be displayed in the sidebar.
  projects: Project[];
  // Callback for handling selection of a project, receiving its id.
  onSelectProject: (id: number) => void;
  // The id of the currently selected project; can be null or undefined if none is selected.
  selectedProjectId: number | null | undefined;
}

// ----------------------
// AppSidebar Component
// ----------------------

/**
 * The AppSidebar component renders a sidebar with navigation options including:
 * - A Home button to navigate to the main page.
 * - An "Add Project" button to trigger the project creation process.
 * - A dynamically generated list of projects that the user can select.
 *
 * @param {AppSidebarProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered sidebar component.
 */
export function AppSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}: AppSidebarProps): JSX.Element {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Grouping the sidebar content under "Your Projects" */}
        <SidebarGroup>
          <h2 className="text-lg font-semibold px-4">Your Projects</h2>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home Button: Navigates back to the home page */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className="flex items-center gap-2 text-stone-700 hover:text-blue-500"
                    href="/"
                  >
                    <Home size={18} />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Add New Project Button: Initiates the project creation process */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onStartAddProject}
                  className="flex items-center gap-2 text-stone-700 hover:text-blue-500"
                >
                  <SquarePlus size={18} />
                  <span>Add Project</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Dynamically render the list of projects */}
              {projects.map((project) => {
                // Determine if this project is currently selected.
                const isActive = project.id === selectedProjectId;
                return (
                  <SidebarMenuItem key={project.id} className="mt-0">
                    <SidebarMenuButton
                      onClick={() => onSelectProject(project.id)}
                      className={`flex items-center gap-2 ${
                        isActive
                          ? "bg-stone-800 text-white"
                          : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
                      }`}
                    >
                      {project.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
