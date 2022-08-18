import { render, screen,cleanup,waitFor } from '@testing-library/react';
import App from '../App';
import axiosMock from "axios";


jest.mock('axios');
afterEach(cleanup);
const url = 'http://localhost:8080';

test('renders default view in screen', async () => {
  axiosMock.get.mockResolvedValue({data: { id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } })
  await waitFor(() => {
    render(<App />);
  });

  expect(screen.getByText("Taste Now....")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("View Cart")).toBeInTheDocument();
  expect(screen.getByText("All Rights Reserved 2022")).toBeInTheDocument();
});