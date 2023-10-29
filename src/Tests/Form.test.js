

// Form.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('Form component should render', () => {
  render(<Form onAddTransaction={() => {}} />);
  const form = screen.getByTestId('transaction-form');
  expect(form).toBeInTheDocument();
});

test('Form should trigger add transaction callback on form submit', () => {
  const mockAddTransactionCallback = jest.fn();
  render(<Form onAddTransaction={mockAddTransactionCallback} />);
  const descriptionInput = screen.getByPlaceholderText('Description');
  const amountInput = screen.getByPlaceholderText('Amount');
  const submitButton = screen.getByText('Add Transaction');

  fireEvent.change(descriptionInput, { target: { value: 'Test Transaction' } });
  fireEvent.change(amountInput, { target: { value: '100.00' } });
  fireEvent.click(submitButton);

  expect(mockAddTransactionCallback).toHaveBeenCalledWith({
    description: 'Test Transaction',
    amount: '100.00',
  });
});