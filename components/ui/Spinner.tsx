// File: /src/components/ui/Spinner.tsx

//  {/* Conditionally render the spinner when loading */}
//  {isLoading ? (
//   <div className="flex justify-center items-center mb-4">
//     <Spinner />
//     <span className="ml-2 text-gray-700 dark:text-gray-300">Processing...</span>
//   </div>
// ) : (
//   <p className="text-gray-700 dark:text-gray-300 mb-4">
//     Click the button below to see the loading spinner in action.
//   </p>
// )}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div role='status' className='flex justify-center items-center'>
      <svg
        className='w-6 h-6 animate-spin text-primary dark:text-white'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0116 0 8 8 0 01-16 0zm2 0a6 6 0 1012 0 6 6 0 00-12 0z'
        ></path>
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Spinner;
