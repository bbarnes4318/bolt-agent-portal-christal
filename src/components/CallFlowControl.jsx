import { useState } from 'react';
import clsx from 'clsx';
import logo from 'src/assets/400x120.png';

export default function CallFlowControl({ isActive, onToggle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async (newState) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/target/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newState })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update status');

      onToggle(newState);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img src={logo} alt="Leadzer Logo" className="w-40 mb-6" />
      
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <div className="space-x-4">
          <button
            onClick={() => handleToggle(true)}
            disabled={isLoading || isActive}
            className={clsx(
              "button-primary transition-all duration-200",
              isActive ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"
            )}
          >
            {isLoading ? "Loading..." : "Start"}
          </button>
          <button
            onClick={() => handleToggle(false)}
            disabled={isLoading || !isActive}
            className={clsx(
              "button-secondary transition-all duration-200",
              !isActive ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            )}
          >
            {isLoading ? "Loading..." : "Pause"}
          </button>
        </div>
        
        <div className="text-lg mt-4">
          Status:{" "}
          <span className={isActive ? "text-green-600" : "text-gray-600"}>
            {isActive ? "Currently Available" : "Paused"}
          </span>
        </div>

        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
}
