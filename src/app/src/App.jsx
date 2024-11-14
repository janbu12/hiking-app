import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Sewa from "./pages/Sewa";
import Login from "./pages/Login";
import Belanja from "./pages/Belanja";
import Produk from "./pages/Produk";
import Error from "./Error";

export default function App() {
  return (
    <Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sewa" element={<Sewa />} />
        <Route path="/belanja" element={<Belanja />} />
        <Route path="/produk/:id" element={<Produk />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}