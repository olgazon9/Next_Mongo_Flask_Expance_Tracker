import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = () => {
      axios.get('http://localhost:5000/balance')
        .then(response => {
          setBalance(response.data.balance);
        })
        .catch(error => {
          console.error('Error fetching balance:', error);
          setError(error);
        });
    };

    fetchBalance();

    // Listen for balance updates from WebSocket
    socket.on('update_balance', (data) => {
      setBalance(data.balance);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('update_balance');
    };
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
