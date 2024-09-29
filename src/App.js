import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Menu from './components/Menu/Menu';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

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
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;