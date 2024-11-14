import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';

export default function LotCalculator() {
  const [capitalCalc, setCapitalCalc] = useState({
    capital: '',
    pips: '',
    lotSize: '0.00'
  });

  const [riskCalc, setRiskCalc] = useState({
    riskAmount: '',
    slPips: '',
    lotSize: '0.00'
  });

  const calculateLotSize = useCallback((capital: number, pips: number) => {
    let lotSize = (capital / 1000) * 1.00;
    if (pips > 10) {
      const pipRiskFactor = pips / 10;
      lotSize /= pipRiskFactor;
    }
    return Math.max(0.01, Number(lotSize.toFixed(2)));
  }, []);

  const calculateRiskBasedLotSize = useCallback((riskAmount: number, slPips: number) => {
    if (slPips <= 0) return 0;
    const lotSize = riskAmount / (slPips * 10);
    return Math.max(0.01, Number(lotSize.toFixed(2)));
  }, []);

  const updateCapitalLotSize = useCallback((capital: string, pips: string) => {
    const capitalNum = parseFloat(capital);
    const pipsNum = parseFloat(pips);
    
    if (!isNaN(capitalNum) && !isNaN(pipsNum) && capitalNum > 0 && pipsNum > 0) {
      const lotSize = calculateLotSize(capitalNum, pipsNum);
      setCapitalCalc(prev => ({ ...prev, lotSize: lotSize.toFixed(2) }));
    } else {
      setCapitalCalc(prev => ({ ...prev, lotSize: '0.00' }));
    }
  }, [calculateLotSize]);

  const updateRiskLotSize = useCallback((riskAmount: string, slPips: string) => {
    const riskNum = parseFloat(riskAmount);
    const slPipsNum = parseFloat(slPips);
    
    if (!isNaN(riskNum) && !isNaN(slPipsNum) && riskNum > 0 && slPipsNum > 0) {
      const lotSize = calculateRiskBasedLotSize(riskNum, slPipsNum);
      setRiskCalc(prev => ({ ...prev, lotSize: lotSize.toFixed(2) }));
    } else {
      setRiskCalc(prev => ({ ...prev, lotSize: '0.00' }));
    }
  }, [calculateRiskBasedLotSize]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Forex Lot Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Capital-based Calculator */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Capital-based Calculation</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Capital ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={capitalCalc.capital}
              onChange={(e) => {
                setCapitalCalc(prev => ({ ...prev, capital: e.target.value }));
                updateCapitalLotSize(e.target.value, capitalCalc.pips);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stop Loss (Pips)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={capitalCalc.pips}
              onChange={(e) => {
                setCapitalCalc(prev => ({ ...prev, pips: e.target.value }));
                updateCapitalLotSize(capitalCalc.capital, e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Recommended Lot Size:</p>
            <p className="text-2xl font-bold text-blue-600">{capitalCalc.lotSize} lots</p>
          </div>
        </div>

        {/* Risk-based Calculator */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Risk-based Calculation</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Risk Amount ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={riskCalc.riskAmount}
              onChange={(e) => {
                setRiskCalc(prev => ({ ...prev, riskAmount: e.target.value }));
                updateRiskLotSize(e.target.value, riskCalc.slPips);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stop Loss (Pips)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={riskCalc.slPips}
              onChange={(e) => {
                setRiskCalc(prev => ({ ...prev, slPips: e.target.value }));
                updateRiskLotSize(riskCalc.riskAmount, e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Recommended Lot Size:</p>
            <p className="text-2xl font-bold text-blue-600">{riskCalc.lotSize} lots</p>
          </div>
        </div>
      </div>
    </div>
  );
}