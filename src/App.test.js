import { render, screen,cleanup,waitFor } from '@testing-library/react';
import App from './App';
import axiosMock from "axios";
import { act } from "react-dom/test-utils";


jest.mock('axios');
afterEach(cleanup);

test('renders default view in screen', async () => {
  axiosMock.get.mockResolvedValue({data: { id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } })
  const url = 'http://localhost:8080';
  
  await waitFor(() => {
    render(<App />);
  });

  expect(screen.getByText("Taste Now....")).toBeInTheDocument();
  expect(screen.getAllByRole("button")).toBeTruthy();
  expect(screen.getByText("All Rights Reserved 2022")).toBeInTheDocument();
});

test('get all menus from the system', async () => { 
  axiosMock.get.mockResolvedValue({data: { id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } })
  const url = 'http://localhost:8080';

  await waitFor(() => {
    render(<App />);
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
})