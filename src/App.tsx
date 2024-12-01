import React, { useState, useEffect } from 'react';
import { Trade, TradeStats } from './types/trade';
import Stats from './components/Stats';
import TradeForm from './components/TradeForm';
import TradeTable from './components/TradeTable';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import LotCalculator from './components/LotCalculator';
import ExportImport from './components/ExportImport';
import { BookOpen } from 'lucide-react';
import { TradeDB } from './utils/db';

const db = new TradeDB();

function App() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [month, setMonth] = useState('All');
  const [tradeResult, setTradeResult] = useState('all');
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadTrades = async () => {
      await db.init();
      const savedTrades = await db.getAllTrades();
      setTrades(savedTrades as Trade[]);
    };
    loadTrades();
  }, []);

  const calculateStats = (trades: Trade[]): TradeStats => {
    const totalPL = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
    const wonTrades = trades.filter(trade => trade.profitLoss > 0).length;
    const winRate = trades.length > 0 ? (wonTrades / trades.length) * 100 : 0;
    const rulesFollowed = trades.filter(trade => trade.rulesFollowed).length;
    const rulesFollowedRate = trades.length > 0 ? (rulesFollowed / trades.length) * 100 : 0;

    return {
      totalPL,
      winRate,
      totalTrades: trades.length,
      rulesFollowedRate
    };
  };

  const filteredTrades = trades.filter(trade => {
    const tradeDate = new Date(trade.date);
    const monthMatch = month === 'All' || tradeDate.toLocaleString('default', { month: 'long' }) === month;
    const resultMatch = 
      tradeResult === 'all' ||
      (tradeResult === 'won' && trade.profitLoss > 0) ||
      (tradeResult === 'lost' && trade.profitLoss < 0);
    return monthMatch && resultMatch;
  });

  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage);

  const handleAddTrade = async (newTrade: Omit<Trade, 'id'>) => {
    const trade = {
      ...newTrade,
      id: Date.now().toString()
    };
    await db.addTrade(trade);
    setTrades([trade, ...trades]);
  };

  const handleEditTrade = async (trade: Trade) => {
    await db.updateTrade(trade);
    setTrades(trades.map(t => t.id === trade.id ? trade : t));
    setEditingTrade(null);
  };

  const handleDeleteTrade = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      await db.deleteTrade(id);
      setTrades(trades.filter(trade => trade.id !== id));
    }
  };

  const handleImport = async (importedTrades: Trade[]) => {
    await db.init();
    for (const trade of importedTrades) {
      await db.addTrade(trade);
    }
    const savedTrades = await db.getAllTrades();
    setTrades(savedTrades as Trade[]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Forex Trading Journal</h1>
          </div>
        </div>

        <Stats stats={calculateStats(trades)} />
        
        <LotCalculator />

        <div className="flex justify-between items-start mb-6">
          <Filters
            month={month}
            setMonth={setMonth}
            tradeResult={tradeResult}
            setTradeResult={setTradeResult}
          />
          <ExportImport trades={trades} onImport={handleImport} />
        </div>

        <TradeForm onSubmit={handleAddTrade} />

        <div className="bg-white rounded-lg shadow">
          <TradeTable
            trades={filteredTrades}
            onEdit={handleEditTrade}
            onDelete={handleDeleteTrade}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;