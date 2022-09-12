import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListMenuComponent from './components/ListMenuComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateMenuComponent from './components/CreateMenuComponent';
import Login from './components/Login';
import OrderDetailsComponent from './components/OrderDetailsComponent';
import ListOrderComponent from './components/ListOrderComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Routes> 
              <Route path="/" exact element = {<ListMenuComponent/>}> </Route>
              <Route path="/add/:id" element = {<CreateMenuComponent/>}></Route>
              <Route path='/login' exact element= {<Login/>}></Route>
              <Route path='/previewOrder' element={<OrderDetailsComponent/>}></Route>
              <Route path='/orders' element={<ListOrderComponent/>}></Route>
            </Routes>
          </div>
          <FooterComponent/>  
      </Router>
    </div>
  );
}

export default App;
