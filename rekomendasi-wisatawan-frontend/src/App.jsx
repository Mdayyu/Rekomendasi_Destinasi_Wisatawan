import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinasi/:id" element={<ShowDetail />} />
        <Route path='/Header'  element={<Header />} />
         <Route path='/Footer'  element={<Footer/>} />
      </Routes>
    </Router>
  );
}

export default App;
