import React, { useState, useEffect } from 'react';
import Table from './components/Table'; // Import the shared Table component
import Form from './components/Form';
import SearchBar from './components/SearchBar';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending order
  const [sortProperty, setSortProperty] = useState('description'); // Default to sorting by description

  // Fetch data from the server (replace with your actual API endpoint)
  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    // Filter transactions based on the search term
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleSort = (property) => {
    // Toggle sorting order if the same property is selected again
    const newSortOrder = property === sortProperty && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortProperty(property);

    // Sort transactions based on the selected property and order
    const sorted = [...filteredTransactions].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a[property].localeCompare(b[property]);
      } else {
        return b[property].localeCompare(a[property]);
      }
    });

    setFilteredTransactions(sorted);
  };

  const handleAddTransaction = (newTransaction) => {
    // Add a new transaction to the list (no backend persistence in this example)
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...filteredTransactions, newTransaction]);
  };

  return (
    <div>
      <h1>Bank Transactions</h1>
      <SearchBar onSearch={handleSearch} />
      <button onClick={() => handleSort('description')}>Sort by Description</button>
      <button onClick={() => handleSort('category')}>Sort by Category</button> {/* Add a button for sorting by category */}
      <Table transactions={filteredTransactions} /> {/* Use the shared Table component here */}
      <Form onAddTransaction={handleAddTransaction} />
    </div>
  );
}

export default App;















