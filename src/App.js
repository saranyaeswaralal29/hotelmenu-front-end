import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ListMenuComponent from './components/ListMenuComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateMenuComponent from './components/CreateMenuComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className="container">
          <Routes> 
            <Route path="/" exact element = {<ListMenuComponent/>}> </Route>
            <Route path="/add/:id" element = {<CreateMenuComponent/>}></Route>
          </Routes>
        </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
