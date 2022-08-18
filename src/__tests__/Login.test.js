import { render, screen,cleanup,waitFor,fireEvent} from '@testing-library/react';
import App from '../App';
import axiosMock from "axios";
import { act } from 'react-dom/test-utils';

describe('Login functionality tests', () => {
  jest.mock('axios');
  afterEach(cleanup);

  test('navigation to login page', async () => {
      axiosMock.get.mockResolvedValue({data: { id:1,categoryName:'Breakfast',itemName:'Idly',price:50 } })
      await waitFor(() => {
          render(<App />);
      });
      const btnLogin = screen.getByText('Login');
      const btnElements = screen.findAllByRole('button');
        
      fireEvent.click(btnLogin);

      expect(screen.findByLabelText('Username :')).toBeTruthy();
      expect(screen.findByLabelText('Password')).toBeTruthy();
      expect(btnElements).toBeTruthy();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
  });


  test('failed login in to application', async () => {
    axiosMock.post.mockRejectedValueOnce({response: {data: {username:'Invalid username',password:'InvalidPassword'}}});
    await waitFor(() => {
      render(<App />);
    });

    await  act(async () => {
      const btnLogin = screen.getByTestId("appLogin");
      fireEvent.click(btnLogin);
    });
  });

  test('successful login in to application', async () => {
    axiosMock.post.mockResolvedValue({data: {username:'mock user',authToken:'mockAuth'}});
    axiosMock.get.mockResolvedValue({data: [{ id:1,categoryName:'Breakfast',itemName:'Idly',price:50 },] })
    await waitFor(() => {
      render(<App />);
    });

    delete window.location;
    window.location = Object.create(window);
    window.location.reload = jest.fn();

    await  act(async () => {
      const btnLogin = screen.getByTestId("appLogin");
      fireEvent.click(btnLogin);
    });
    expect(screen.getByText('Add Menu')).toBeTruthy();
    expect(screen.getByText('Update')).toBeTruthy();
    expect(screen.getByText('Delete')).toBeTruthy();
  });
});