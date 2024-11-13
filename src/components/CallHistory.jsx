import { format } from 'date-fns'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

export default function CallHistory({ isLoading, callLogs }) {
  if (isLoading) {
    return <div className="text-center py-8">Loading call history...</div>
  }

  if (!callLogs?.length) {
    return <div className="text-center py-8">No call history available</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Call Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Buyer
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Target
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Caller ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Duration
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Enrollment
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Recording
            </th>
          </tr>
        </thead>
        <tbody>
          {callLogs.map((call, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm border-b">
                {format(new Date(call.callDt), 'MM/dd/yyyy HH:mm')}
              </td>
              <td className="px-4 py-3 text-sm border-b">{call.buyer}</td>
              <td className="px-4 py-3 text-sm border-b">{call.targetName}</td>
              <td className="px-4 py-3 text-sm border-b">{call.inboundPhoneNumber}</td>
              <td className="px-4 py-3 text-sm border-b">
                {Math.floor(call.callLengthInSeconds / 60)}:{String(call.callLengthInSeconds % 60).padStart(2, '0')}
              </td>
              <td className="px-4 py-3 text-sm border-b text-center">
                {call.hasConverted ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mx-auto" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500 mx-auto" />
                )}
              </td>
              <td className="px-4 py-3 text-sm border-b">
                {call.recordingUrl && (
                  <a 
                    href={call.recordingUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Play
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
