import { render, screen,cleanup,waitFor,fireEvent,userEvent } from '@testing-library/react';
import App from '../App';
import axiosMock from "axios";
import { act } from 'react-dom/test-utils';

jest.mock('axios');
afterEach(cleanup);

test('navigation to add menu page', async () => {
    axiosMock.get.mockResolvedValue({data: [{ id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } ,]})
    axiosMock.post.mockResolvedValue({data: {username:'mock user',authToken:'mockAuth'}});

    await waitFor(() => {
        render(<App />);
    });
    const btnLogin = screen.getByText('Login');
    fireEvent.click(btnLogin);
    const savedLocation = window.location;
    delete window.location;
    window.location = Object.create(window);
    window.location.reload = jest.fn();
    await  act(async () => {
        const btnLogin = screen.getByTestId("appLogin");
        fireEvent.click(btnLogin);
    });

    window.location.reload.mockRestore();
    window.location = savedLocation;
    const addMenu = screen.getByText('Add Menu');
    fireEvent.click(addMenu);

    //expect(screen.getByLabelText('Category Name :')).toBeInTheDocument();
});