// components/BalanceChart.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const BalanceChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Balance Over Time',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      fill: false,
    }],
  });

  useEffect(() => {
    axios.get('http://localhost:5000/transactions')
      .then(response => {
        const processedData = processChartData(response.data);
        setChartData(processedData);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const processChartData = (transactions: any[]) => {
    let balance = 0;
    const labels: string[] = [];
    const data: number[] = [];

    // Ensure transactions are sorted by date
    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    transactions.forEach(transaction => {
      balance += transaction.type === 'income' ? parseFloat(transaction.amount) : -parseFloat(transaction.amount);
      labels.push(new Date(transaction.date).toLocaleDateString());
      data.push(balance);
    });

    return {
      labels,
      datasets: [{ ...chartData.datasets[0], data }]
    };
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false, // Start from the lowest value in your data
        title: {
          display: true,
          text: 'Dollars ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '400px' }}>
      <h2>Balance Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default BalanceChart;
