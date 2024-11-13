import { useState, useEffect } from 'react'
import CallHistory from './components/CallHistory'
import CallFlowControl from './components/CallFlowControl'
import { fetchCallLogs } from './services/ringbaApi'

export default function App() {
  const [isActive, setIsActive] = useState(false)
  const [callLogs, setCallLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCallLogs = async () => {
      try {
        const data = await fetchCallLogs()
        setCallLogs(data)
      } catch (err) {
        setError('Failed to load call logs')
        console.error('Error loading call logs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCallLogs()
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ACA Agent Call History and Management Portal
        </h1>
        
        <CallFlowControl 
          isActive={isActive} 
          onToggle={setIsActive} 
        />

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <CallHistory 
            isLoading={isLoading}
            callLogs={callLogs}
          />
        )}
      </div>
    </div>
  )
}