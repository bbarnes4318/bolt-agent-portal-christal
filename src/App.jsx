import { useState } from 'react'
import CallHistory from './components/CallHistory'
import CallFlowControl from './components/CallFlowControl'

export default function App() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ACA Agent Call History and Management Portal
        </h1>
        
        <CallFlowControl isActive={isActive} onToggle={setIsActive} />
        <CallHistory />
      </div>
    </div>
  )
}
