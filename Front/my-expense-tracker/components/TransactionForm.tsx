// components/TransactionForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [transaction, setTransaction] = useState({
    description: '',
    amount: 0,
    date: '',
    type: 'income',  // or 'expense'
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post('http://localhost:5000/transaction', transaction)
      .then(response => {
        // Handle success
      })
      .catch(error => console.error('Error adding transaction:', error));
  };

  // Update state for each input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <input name="description" type="text" placeholder="Description" onChange={handleChange} />
      <input name="amount" type="number" placeholder="Amount" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <select name="type" onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
