import { render, screen } from '@testing-library/react';
import App from './App';

test('renders default view in screen', () => {
  render(<App />);
  const title = screen.getByRole("heading");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Menu List");

  expect(screen.getByRole('button')).toHaveTextContent("Add Menu");
  expect(screen.getByRole('table')).toBeInTheDocument();
});
