// components/TransactionHistory.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axios.get('http://localhost:5000/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  };

  const clearHistory = () => {
    axios.post('http://localhost:5000/clear-transactions')
      .then(response => {
        console.log(response.data.message);
        setTransactions([]); // Clear the transactions state
      })
      .catch(error => console.error('Error clearing transactions:', error));
  };

  return (
    <div>
      <h2>Transaction History</h2>
      <button onClick={clearHistory}>Clear History</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type}</td>
              <td>${transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
