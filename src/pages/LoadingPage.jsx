import React from 'react'

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-gray-800 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-10 border-blue-200 rounded-full"></div>

          <div className="absolute w-16 h-16 border-10 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="ml-4 text-white text-2xl font-medium ">Loading...</p>
      </div>
  )
}
