// TableContainer.js
import React from 'react';
import Table from './Table';

const columns = [
  { key: 'date', title: 'Date' },
  { key: 'description', title: 'Description' },
  { key: 'amount', title: 'Amount' },
];

function TableContainer({ transactions, handleDelete }) {
  return (
    <Table data={transactions} columns={columns} handleAction={handleDelete} />
  );
}

export default TableContainer;

