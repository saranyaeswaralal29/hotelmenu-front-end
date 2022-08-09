import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const allMenus = [
  { id: 1, categoryName: 'BreakFast', itemName:'Dosa', price:40 }, 
  { id: 2,  categoryName: 'BreakFast', itemName:'Poori', price:60 }, 
  { id: 3,  categoryName: 'BreakFast', itemName:'Pongal', price:50 }
];

const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(ctx.json({ recipes: allMenus }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test('renders default view in screen', () => {
  render(<App />);
});
