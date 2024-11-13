import { useState } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { format } from 'date-fns'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { utils, writeFile } from 'xlsx'

const SAMPLE_DATA = [
  {
    id: 1,
    date: new Date('2023-10-01T10:00:00'),
    buyer: 'Buyer 1',
    target: 'Target 1',
    callerId: '123-456-7890',
    state: 'GA',
    duration: '39 min',
    enrollment: true,
  },
  {
    id: 2,
    date: new Date('2023-10-01T11:30:00'),
    buyer: 'Buyer 2',
    target: 'Target 2',
    callerId: '234-567-8901',
    state: 'TN',
    duration: '13 min',
    enrollment: false,
  },
]

export default function CallHistory() {
  const [data] = useState(SAMPLE_DATA)
  
  const columns = [
    {
      Header: 'Call Date',
      accessor: 'date',
      Cell: ({ value }) => format(value, 'MM/dd/yyyy HH:mm'),
    },
    {
      Header: 'Buyer',
      accessor: 'buyer',
    },
    {
      Header: 'Target',
      accessor: 'target',
    },
    {
      Header: 'Caller ID',
      accessor: 'callerId',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Duration',
      accessor: 'duration',
    },
    {
      Header: 'Enrollment',
      accessor: 'enrollment',
      Cell: ({ value }) => (
        value ? 
          <CheckCircleIcon className="w-6 h-6 text-green-500 mx-auto" /> :
          <XCircleIcon className="w-6 h-6 text-red-500 mx-auto" />
      ),
    },
    {
      Header: 'Recording',
      Cell: () => (
        <button className="text-blue-600 hover:text-blue-800">
          Play
        </button>
      ),
    },
  ]

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageSize: 10 } },
    useSortBy,
    usePagination
  )

  const handleExport = () => {
    const exportData = data.map(row => ({
      'Call Date': format(row.date, 'MM/dd/yyyy HH:mm'),
      'Buyer': row.buyer,
      'Target': row.target,
      'Caller ID': row.callerId,
      'State': row.state,
      'Duration': row.duration,
      'Enrollment': row.enrollment ? 'Yes' : 'No',
    }))

    const ws = utils.json_to_sheet(exportData)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Call History')
    writeFile(wb, 'CallHistory.xlsx')
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 border-b"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-3 text-sm border-b"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={previousPage}
            disabled={!canPreviousPage}
            className="px-4 py-2 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className="px-4 py-2 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
          <span className="self-center text-sm text-gray-600">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>
    </div>
  )
}
