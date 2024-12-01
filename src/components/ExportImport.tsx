import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Trade } from '../types/trade';

interface ExportImportProps {
  trades: Trade[];
  onImport: (trades: Trade[]) => void;
}

export default function ExportImport({ trades, onImport }: ExportImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'Market', 'Setup', 'Profit/Loss', 'Rules Followed', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...trades.map(trade => [
        new Date(trade.date).toLocaleDateString(),
        trade.market,
        trade.setup,
        trade.profitLoss,
        trade.rulesFollowed ? 'Yes' : 'No',
        `"${trade.notes?.replace(/"/g, '""') || ''}"` // Escape quotes in notes
      ].join(','))
    ].join('\n');

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `forex-journal-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        
        const trades: Trade[] = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          return {
            id: Date.now() + index.toString(),
            date: new Date(values[0]).toISOString(),
            market: values[1] as 'XAUUSD' | 'USDJPY',
            setup: values[2] as 'SA1' | 'Fibs',
            profitLoss: parseFloat(values[3]),
            rulesFollowed: values[4].trim().toLowerCase() === 'yes',
            notes: values[5]?.replace(/^"|"$/g, '').replace(/""/g, '"') || ''
          };
        });
        
        onImport(trades);
      } catch (error) {
        alert('Invalid CSV file format');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex justify-end space-x-4 mb-4">
      <button
        onClick={handleExport}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-5 h-5" />
        <span>Export CSV</span>
      </button>
      
      <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
        <Upload className="w-5 h-5" />
        <span>Import CSV</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}