import { useState } from 'react'
import { format } from 'date-fns'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

export default function CallHistory({ isLoading, error, calls = [] }) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

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
            {isLoading ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  Loading call history...
                </td>
              </tr>
            ) : calls.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No call history available
                </td>
              </tr>
            ) : (
              calls.map((call, index) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}