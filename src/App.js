import './App.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Menu from './components/Menu/Menu';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import ChartJS from './components/ChartJS/ChartJS';
import ChartD3JS from './components/ChartD3JS/ChartD3JS';

import AboutPage from './page/AboutPage/AboutPage';
import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage';

function App() {

  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage jsChart={<ChartJS/>} d3jsChart={<ChartD3JS/>}/>} /> 
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
