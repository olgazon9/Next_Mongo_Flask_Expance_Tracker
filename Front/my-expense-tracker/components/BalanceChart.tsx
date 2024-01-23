import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import io from 'socket.io-client';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const socket = io('http://localhost:5000');

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
    const fetchData = () => {
      axios.get('http://localhost:5000/transactions')
        .then(response => {
          const processedData = processChartData(response.data);
          setChartData(processedData);
        })
        .catch(error => console.error('Error fetching transactions:', error));
    };

    fetchData();

    socket.on('update_balance', fetchData);

    return () => {
      socket.off('update_balance');
    };
  }, []);

  const processChartData = (transactions) => {
    let balance = 0;
    const labels = [];
    const data = [];

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
        beginAtZero: false,
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
