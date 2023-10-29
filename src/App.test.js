import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Bank Transactions/i); // Replace with the actual title of your app
  expect(titleElement).toBeInTheDocument();
});

// Add more custom tests for your components and functionality as needed.

