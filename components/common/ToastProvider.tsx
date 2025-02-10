// File: /components/common/ToastProvider.tsx

"use client";

import React, { JSX } from "react";
import { ToastContainer } from "react-toastify";

/**
 * ToastProvider Component
 *
 * Wraps the application with the ToastContainer from react-toastify to provide
 * global toast notification functionality with pre-configured options.
 *
 * @returns {JSX.Element} The rendered ToastContainer.
 */
export default function ToastProvider(): JSX.Element {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  );
}
