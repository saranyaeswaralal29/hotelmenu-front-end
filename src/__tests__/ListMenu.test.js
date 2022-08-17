import { render, screen,cleanup,waitFor,fireEvent } from '@testing-library/react';
import App from '../App';
import axiosMock from "axios";


jest.mock('axios');
afterEach(cleanup);
const url = 'http://localhost:8080';

test('message to be displayed when no menu found', async () => {
    axiosMock.get.mockResolvedValue({data: { errorMessage: 'No Menu Exists' } })

    await waitFor(() => {
        render(<App />);
    });
    expect(screen.findAllByText("No Menu Exists")).toBeTruthy();
});

test('get all menus from the system', async () => { 
    axiosMock.get.mockResolvedValue({data: { id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } })
  
    await waitFor(() => {
      render(<App />);
    });
  
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
});

test('add items to cart and navigate to order page', async () => {
    axiosMock.get.mockResolvedValue({data:{ id:1,categoryName:'Breakfast',itemName:'Idly',price:50 }})
    await waitFor(() => {
        render( <App />);
        console.log(screen);
    });
});

test('when no items added to cart and click on view cart, display message', async () => {
    axiosMock.get.mockResolvedValue({data:[ { id:1,categoryName:'Breakfast',itemName:'Idly',price:50 },{ id:2,categoryName:'Breakfast',itemName:'Dosa',price:50 }]})
    await waitFor(() => {
        render( <App />);
    });
    const btnViewCart = screen.getByText('View Cart');

    fireEvent.click(btnViewCart);
    expect(screen.getByText('No Items in Cart')).toBeInTheDocument();
});

