import clsx from 'clsx'

export default function CallFlowControl({ isActive, onToggle }) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="flex gap-4">
        <button
          onClick={() => onToggle(true)}
          className={clsx(
            "px-6 py-3 rounded-lg font-medium transition-colors",
            isActive ? "bg-[#FF8200] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          Start
        </button>
        <button
          onClick={() => onToggle(false)}
          className={clsx(
            "px-6 py-3 rounded-lg font-medium transition-colors",
            !isActive ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          Pause
        </button>
      </div>
      <p className="text-lg">
        Status: <span className={isActive ? "text-green-600" : "text-gray-600"}>
          {isActive ? "Currently Available" : "Paused"}
        </span>
      </p>
    </div>
  )
}