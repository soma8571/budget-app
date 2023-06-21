import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateItem } from "./pages/create-item";
import { Navbar } from './components/Navbar';
import NoSuchPage from './pages/NoSuchPage';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function App() {

  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.access_token === "" || !cookies.access_token) {
      navigate("/auth");
    } else {
      navigate("/");
    }
  }, [cookies]);

  
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<><Navbar /><div className="container"><Home /></div></>}></Route>
        <Route path="/auth" element={<div className="container"><Auth /></div>}></Route>
        <Route
          path="/create-item"
          element={<><Navbar /><div className="container"><CreateItem /></div></>}
        >
        </Route>
        <Route path="*" element={<NoSuchPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
