import React, { useState } from 'react';

function Form({ onAddTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(), // Generate a unique ID
      description,
      amount,
      date: new Date().toLocaleDateString(),
    };

    onAddTransaction(newTransaction); // Pass the new transaction to the parent component
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Form;




