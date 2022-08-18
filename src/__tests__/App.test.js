import { render, screen,cleanup,waitFor } from '@testing-library/react';
import App from '../App';
import MenuService from '../services/MenuService';

describe('Default view tests', () => {
  afterEach(cleanup);

  test('renders default view in screen', async () => {
    MenuService.getMenus = jest.fn().mockResolvedValue({data: { id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } });
    await waitFor(() => {
      render(<App />);
    });

    expect(screen.getByText("Taste Now....")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("View Cart")).toBeInTheDocument();
    expect(screen.getByText("All Rights Reserved 2022")).toBeInTheDocument();
  });
});