// Import necessary dependencies and components

// Table.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

const sampleTransactions = [
  { id: 1, date: '2023-01-15', description: 'Transaction 1', amount: 100.0 },
  { id: 2, date: '2023-01-16', description: 'Transaction 2', amount: -50.0 },
];

test('Table component should render', () => {
  render(<Table transactions={sampleTransactions} handleDelete={() => {}} />);
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
});

test('Table should render transactions', () => {
  render(<Table transactions={sampleTransactions} handleDelete={() => {}} />);
  const transactionRows = screen.getAllByRole('row', { name: '' });

  expect(transactionRows).toHaveLength(sampleTransactions.length);

  sampleTransactions.forEach((transaction, index) => {
    const [dateCell, descriptionCell, amountCell, actionCell] = transactionRows[index].getElementsByTagName('td');
    expect(dateCell).toHaveTextContent(transaction.date);
    expect(descriptionCell).toHaveTextContent(transaction.description);
    expect(amountCell).toHaveTextContent(transaction.amount.toString());
    expect(actionCell).toBeInTheDocument();
  });
});

test('Table should trigger delete callback when delete button is clicked', () => {
  const handleDelete = jest.fn();
  render(<Table transactions={sampleTransactions} handleDelete={handleDelete} />);
  const deleteButtons = screen.getAllByText('Delete');

  deleteButtons.forEach((button, index) => {
    fireEvent.click(button);
    expect(handleDelete).toHaveBeenCalledWith(sampleTransactions[index].id);
  });
});
