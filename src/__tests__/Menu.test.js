import { render, screen,waitFor,fireEvent} from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import MenuService from '../services/MenuService';
import LoginService from '../services/LoginService';

describe('Menu actions tests', () => {
    jest.mock('axios');
    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = ''; 
    });

    test('navigation to add menu page and save', async () => {
        MenuService.getCategories = jest.fn().mockResolvedValue({data:['Breakfast']});
        MenuService.getMenus = jest.fn().mockResolvedValue({data: [{ id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } ,]});
        LoginService.loginApi = jest.fn().mockResolvedValueOnce({data: {username:'mock user',authToken:'mockAuth'}});
        MenuService.createMenu = jest.fn().mockResolvedValueOnce({data: {id:1,categoryName:'Breakfast',itemName:'Poori',price:80}});

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

        expect(screen.getByLabelText('Category Name :')).toBeInTheDocument();
        const saveMenu = screen.getByText('Save');
        await  act(async () => {
            fireEvent.click(saveMenu);
        });
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });
});