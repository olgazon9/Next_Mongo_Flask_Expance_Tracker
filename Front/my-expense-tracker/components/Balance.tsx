// Balance.tsx (in your Next.js project)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/balance')
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error loading balance.</div>;
  }

  return (
    <div>
      <h2>Current Balance</h2>
      <p>${balance}</p>
    </div>
  );
};

export default Balance;
