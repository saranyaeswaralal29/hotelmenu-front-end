import { render, screen,cleanup,waitFor,fireEvent} from '@testing-library/react';
import App from '../App';
import axiosMock from "axios";
import { act } from 'react-dom/test-utils';

jest.mock('axios');
afterEach(cleanup);

const url = 'http://localhost:8080';

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


test('successfully login in to application', async () => {
  axiosMock.post.mockRejectedValueOnce({response: {data: {username:'Invalid username',password:'InvalidPassword'}}});
  await waitFor(() => {
    render(<App />);
    
  });

  await  act(async () => {
    const btnLogin = screen.getByTestId("appLogin");
    fireEvent.click(btnLogin);
  });
});