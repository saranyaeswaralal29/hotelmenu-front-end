import { render, screen,cleanup,fireEvent } from '@testing-library/react';
import App from './App';
import ListMenuComponent from './components/ListMenuComponent';

afterEach(cleanup);

test('renders default view in screen', () => {
  render(<App />);

  expect(screen.getByText("Taste Now....")).toBeInTheDocument();
  expect(screen.getByText(/Log/i).textContent).toBe("Login");
  expect(screen.getByText("Menu List")).toBeInTheDocument();
});

test('navigate to login page on Login button click', ()=> {
  render(<App/>);

  expect(screen.getByText(/Log/i).textContent).toBe("Login");
  fireEvent.click(screen.getByText("Login"));

  expect(screen.getByText(/User/i).textContent).toBe("Username :");
  expect(screen.getByText(/Pass/i).textContent).toBe("Password :");
});