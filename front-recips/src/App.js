
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Styles/CardStyle.css'
import './App.css';

function App() {
 
  return (

    
     <div className="App">
        
        <Router>
        <Routes>
        <Route path="/recips" element={<Home/>} />
        </Routes>
      </Router>
      </div>
     
    
  );
}

export default App;
