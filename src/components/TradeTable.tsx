import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Trade } from '../types/trade';

interface TradeTableProps {
  trades: Trade[];
  onEdit: (trade: Trade) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  itemsPerPage: number;
}

export default function TradeTable({
  trades,
  onEdit,
  onDelete,
  currentPage,
  itemsPerPage
}: TradeTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTrades = trades.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setup</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P/L</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rules Followed</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentTrades.map((trade) => (
            <tr key={trade.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(trade.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.market}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.setup}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {trade.profitLoss >= 0 ? '+' : ''}{trade.profitLoss.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  trade.rulesFollowed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {trade.rulesFollowed ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                {trade.notes || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(trade)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(trade.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}