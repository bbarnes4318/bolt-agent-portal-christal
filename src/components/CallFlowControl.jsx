import { useState } from 'react'
import clsx from 'clsx'
import { updateTargetStatus } from '../services/ringbaApi'

export default function CallFlowControl({ isActive, onToggle }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleToggle = async (newStatus) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await updateTargetStatus(newStatus)
      onToggle(newStatus)
    } catch (err) {
      setError('Failed to update status. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="flex gap-4">
        <button
          onClick={() => handleToggle(true)}
          disabled={isLoading || isActive}
          className={clsx(
            "px-6 py-3 rounded-lg font-medium transition-colors",
            isActive 
              ? "bg-[#FF8200] text-white cursor-not-allowed" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? "Loading..." : "Start"}
        </button>
        <button
          onClick={() => handleToggle(false)}
          disabled={isLoading || !isActive}
          className={clsx(
            "px-6 py-3 rounded-lg font-medium transition-colors",
            !isActive 
              ? "bg-gray-700 text-white cursor-not-allowed" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? "Loading..." : "Pause"}
        </button>
      </div>
      
      <p className="text-lg">
        Status: <span className={isActive ? "text-green-600" : "text-gray-600"}>
          {isActive ? "Currently Available" : "Paused"}
        </span>
      </p>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
