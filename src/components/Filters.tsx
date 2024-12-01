import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  month: string;
  setMonth: (month: string) => void;
  tradeResult: string;
  setTradeResult: (result: string) => void;
}

export default function Filters({
  month,
  setMonth,
  tradeResult,
  setTradeResult
}: FiltersProps) {
  const months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex flex-wrap gap-4">
            <div>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={tradeResult}
                onChange={(e) => setTradeResult(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Trades</option>
                <option value="won">Won Trades</option>
                <option value="lost">Lost Trades</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}