import { useState } from 'react'
import clsx from 'clsx'

export default function CallFlowControl({ isActive, onToggle }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleToggle = async (newState) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/target/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabled: newState })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update status');
      }

      onToggle(newState);
      console.log(`Button turned ${newState ? 'ON' : 'OFF'} successfully.`);
    } catch (err) {
      setError(err.message);
      console.error('Error updating status:', err);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => handleToggle(true)}
          disabled={isLoading || isActive}
          className={clsx(
            "px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200",
            isActive 
              ? "bg-orange-500 text-white opacity-50 cursor-not-allowed"
              : isLoading
                ? "bg-orange-300 text-white cursor-wait"
                : "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700"
          )}
        >
          {isLoading ? "Loading..." : "Start"}
        </button>
        <button
          onClick={() => handleToggle(false)}
          disabled={isLoading || !isActive}
          className={clsx(
            "px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200",
            !isActive
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isLoading
                ? "bg-gray-400 text-white cursor-wait"
                : "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800"
          )}
        >
          {isLoading ? "Loading..." : "Pause"}
        </button>
      </div>
      
      <div className="text-xl font-medium">
        Status: {" "}
        <span className={clsx(
          "font-semibold",
          isActive ? "text-green-600" : "text-gray-600"
        )}>
          {isActive ? "Currently Available" : "Paused"}
        </span>
      </div>

      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}