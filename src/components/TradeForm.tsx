import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Trade } from '../types/trade';

interface TradeFormProps {
  onSubmit: (trade: Omit<Trade, 'id'>) => void;
}

export default function TradeForm({ onSubmit }: TradeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    market: 'XAUUSD',
    setup: 'SA1',
    profitLoss: '',
    rulesFollowed: true,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      profitLoss: Number(formData.profitLoss)
    });
    setFormData({
      date: '',
      market: 'XAUUSD',
      setup: 'SA1',
      profitLoss: '',
      rulesFollowed: true,
      notes: ''
    });
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Trade
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Market</label>
              <select
                value={formData.market}
                onChange={(e) => setFormData({ ...formData, market: e.target.value as 'XAUUSD' | 'USDJPY' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="XAUUSD">XAUUSD</option>
                <option value="USDJPY">USDJPY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Setup</label>
              <select
                value={formData.setup}
                onChange={(e) => setFormData({ ...formData, setup: e.target.value as 'SA1' | 'Fibs' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="SA1">SA1</option>
                <option value="Fibs">Fibs</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profit/Loss</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="Enter P/L (e.g., -50.5 or 100)"
                value={formData.profitLoss}
                onChange={(e) => setFormData({ ...formData, profitLoss: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rules Followed</label>
              <select
                value={formData.rulesFollowed.toString()}
                onChange={(e) => setFormData({ ...formData, rulesFollowed: e.target.value === 'true' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Trade
            </button>
          </div>
        </form>
      )}
    </div>
  );
}