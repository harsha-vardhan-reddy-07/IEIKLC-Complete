import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authenticate from './pages/Authenticate';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import Members from './pages/Members';


function App() {
  return (
    <div className="App">
      
      

      <Routes >

            <Route path='/' element={<Home />} />
            <Route path='/authenticate' element={<Authenticate />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/members' element={<Members />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
