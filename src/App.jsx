import { useState } from 'react';
import CallFlowControl from './components/CallFlowControl';
import CallHistory from './components/CallHistory';

export default function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {/* Removed unnecessary header text */}
        
        {/* Call Flow Control Buttons */}
        <CallFlowControl isActive={isActive} onToggle={setIsActive} />

        {/* Call Log Table */}
        <CallHistory />
      </div>
    </div>
  );
}
