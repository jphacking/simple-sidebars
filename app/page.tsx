// File: /app/page.tsx

"use client";

import Head from "next/head";
import { useReducer, useCallback } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { NewProject } from "@/components/projects/NewProject";
import { NoProjectSelected } from "@/components/projects/NoProjectSelected";
import { SelectedProject } from "@/components/projects/SelectedProjects";

// ----- Types ----- //

interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface Task {
  id: number;
  text: string;
  projectId: number;
}

interface ProjectsState {
  selectedProjectId: number | null | undefined;
  projects: Project[];
  tasks: Task[];
}

type Action =
  | { type: "SELECT_PROJECT"; payload: number }
  | { type: "START_ADD_PROJECT" }
  | { type: "ADD_PROJECT"; payload: Omit<Project, "id"> }
  | { type: "CANCEL_ADD_PROJECT" }
  | { type: "DELETE_PROJECT" }
  | { type: "ADD_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: number };

// ----- Reducer ----- //

function projectsReducer(state: ProjectsState, action: Action): ProjectsState {
  switch (action.type) {
    case "SELECT_PROJECT":
      return { ...state, selectedProjectId: action.payload };
    case "START_ADD_PROJECT":
      return { ...state, selectedProjectId: null };
    case "ADD_PROJECT": {
      const projectId = Date.now(); // For production, consider using a dedicated unique ID generator.
      return {
        ...state,
        selectedProjectId: projectId,
        projects: [...state.projects, { ...action.payload, id: projectId }],
      };
    }
    case "CANCEL_ADD_PROJECT":
      return { ...state, selectedProjectId: undefined };
    case "DELETE_PROJECT": {
      const projectId = state.selectedProjectId;
      if (projectId == null) return state;
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter((project) => project.id !== projectId),
        tasks: state.tasks.filter((task) => task.projectId !== projectId),
      };
    }
    case "ADD_TASK": {
      const projectId = state.selectedProjectId;
      if (!projectId) return state; // Prevent adding tasks when no project is selected.
      const newTask: Task = {
        id: Date.now(),
        text: action.payload,
        projectId,
      };
      return { ...state, tasks: [...state.tasks, newTask] };
    }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
}

const initialState: ProjectsState = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
};

// ----- Home Component ----- //

export default function Home() {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  // --- Dispatch Handlers --- //

  const handleSelectProject = useCallback((id: number) => {
    dispatch({ type: "SELECT_PROJECT", payload: id });
  }, []);

  const handleStartAddProject = useCallback(() => {
    dispatch({ type: "START_ADD_PROJECT" });
  }, []);

  const handleAddProject = useCallback((projectData: Omit<Project, "id">) => {
    dispatch({ type: "ADD_PROJECT", payload: projectData });
  }, []);

  const handleCancelAddProject = useCallback(() => {
    dispatch({ type: "CANCEL_ADD_PROJECT" });
  }, []);

  const handleDeleteProject = useCallback(() => {
    dispatch({ type: "DELETE_PROJECT" });
  }, []);

  const handleAddTask = useCallback((text: string) => {
    dispatch({ type: "ADD_TASK", payload: text });
  }, []);

  const handleDeleteTask = useCallback((id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  // --- Conditional Content --- //

  let content;
  if (state.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (state.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    const selectedProject = state.projects.find(
      (project) => project.id === state.selectedProjectId
    );
    const projectTasks = state.tasks.filter(
      (task) => task.projectId === state.selectedProjectId
    );

    content = selectedProject ? (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectTasks}
      />
    ) : (
      <NoProjectSelected onStartAddProject={handleStartAddProject} />
    );
  }

  // --- Render --- //

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <title>Project Dashboard</title>
        <meta name="description" content="Manage your projects easily" />
      </Head>

      <SidebarProvider>
        <AppSidebar
          onStartAddProject={handleStartAddProject}
          projects={state.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={state.selectedProjectId}
        />

        <SidebarTrigger />
        <div className="w-full h-screen flex justify-start bg-gray-100 p-4">
          {content}
        </div>
      </SidebarProvider>
    </>
  );
}
