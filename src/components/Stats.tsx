import React from 'react';
import { DollarSign, Target, BookOpen, CheckCircle } from 'lucide-react';
import { TradeStats } from '../types/trade';

interface StatsProps {
  stats: TradeStats;
}

export default function Stats({ stats }: StatsProps) {
  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total P/L"
        value={`$${stats.totalPL.toFixed(2)}`}
        icon={DollarSign}
        color={`${stats.totalPL >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
      />
      <StatCard
        title="Win Rate"
        value={`${stats.winRate.toFixed(1)}%`}
        icon={Target}
        color="bg-blue-500"
      />
      <StatCard
        title="Total Trades"
        value={stats.totalTrades}
        icon={BookOpen}
        color="bg-purple-500"
      />
      <StatCard
        title="Rules Followed"
        value={`${stats.rulesFollowedRate.toFixed(1)}%`}
        icon={CheckCircle}
        color="bg-indigo-500"
      />
    </div>
  );
}