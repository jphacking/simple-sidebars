// File: /components/common/Loader.tsx

"use client";

import React from "react";

/**
 * Loader Component
 *
 * Displays a centered spinner that indicates loading. This can be used
 * throughout the application when content is being fetched or processed.
 *
 * @returns {JSX.Element} The rendered Loader component.
 */
const Loader: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
