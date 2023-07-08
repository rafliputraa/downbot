"use client";
import { useState } from 'react';

export default function Dashboard() {
    const [initialInvestment, setInitialInvestment] = useState('');
    const [initialShares, setInitialShares] = useState('');
    const [currentStockPrice, setCurrentStockPrice] = useState('');
    const [additionalInvestment, setAdditionalInvestment] = useState('');
    const [additionalShares, setAdditionalShares] = useState('');
    const [averageDownPrice, setAverageDownPrice] = useState('');
    const [lossGainPercentage, setLossGainPercentage] = useState('');

    const calculateAverageDown = () => {
        const initialInvestmentValue = parseFloat(initialInvestment);
        const initialSharesValue = parseFloat(initialShares);
        const currentStockPriceValue = parseFloat(currentStockPrice);
        const additionalInvestmentValue = parseFloat(additionalInvestment);
        const additionalSharesValue = parseFloat(additionalShares);
  
        const averageDownPriceValue =
      ((initialInvestmentValue * initialSharesValue) +
        (currentStockPriceValue * additionalSharesValue)) /
      (initialSharesValue + additionalSharesValue);
  
      const formattedAverageDownPrice = formatCurrency(averageDownPriceValue, 'IDR');
      setAverageDownPrice(`The average down price is: ${formattedAverageDownPrice}`);
  
      const totalInvestment = initialInvestmentValue + additionalInvestmentValue;
      const totalShares = initialSharesValue + additionalSharesValue;
      const totalCost = totalInvestment + (currentStockPriceValue * totalShares);
  
      const lossGainPercentageValue =
        ((averageDownPriceValue * totalShares) - totalCost) / totalCost * 100;
      const formattedLossGainPercentage = lossGainPercentageValue.toFixed(2);
  
      const lossGainText = lossGainPercentageValue < 0 ? 'loss' : 'gain';
      setLossGainPercentage(`You have a ${formattedLossGainPercentage}% ${lossGainText}.`);
    }

    function formatCurrency(value: number | bigint, currency: string) {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      }

    return (
        <main>
            <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold mb-8">Average Down Calculator</h1>
      <div className="flex flex-col items-center gap-4">
        <label htmlFor="initial-investment">Current Average Price (IDR):</label>
        <input
          type="number"
          id="initial-investment"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          step="0.01"
          placeholder="Enter initial investment amount"
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="initial-shares">Initial Number of Shares:</label>
        <input
          type="number"
          id="initial-shares"
          value={initialShares}
          onChange={(e) => setInitialShares(e.target.value)}
          step="0.01"
          placeholder="Enter initial number of shares"
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="current-stock-price">Current Stock Price (IDR):</label>
        <input
          type="number"
          id="current-stock-price"
          value={currentStockPrice}
          onChange={(e) => setCurrentStockPrice(e.target.value)}
          step="0.01"
          placeholder="Enter current stock price"
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="additional-investment">Additional Investment Amount (IDR):</label>
        <input
          type="number"
          id="additional-investment"
          value={additionalInvestment}
          onChange={(e) => setAdditionalInvestment(e.target.value)}
          step="0.01"
          placeholder="Enter additional investment amount"
          className="p-2 border border-gray-300 rounded"
        />
        <label htmlFor="additional-shares">Additional Number of Shares:</label>
        <input
          type="number"
          id="additional-shares"
          value={additionalShares}
          onChange={(e) => setAdditionalShares(e.target.value)}
          step="0.01"
          placeholder="Enter additional number of shares"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={calculateAverageDown}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </div>
      {averageDownPrice && (
        <div className="mt-8">
          The average down price is: {averageDownPrice}
        </div>
      )}
      {lossGainPercentage && (
        <div className="mt-4">
          You have a {parseFloat(lossGainPercentage) < 0 ? 'loss' : 'gain'} of {lossGainPercentage}%.
        </div>
      )}
    </div>
        </main>
    )
}