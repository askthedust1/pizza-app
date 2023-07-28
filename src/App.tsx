import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormAdmin from "./container/FormAdmin/FormAdmin";
import Home from "./container/Home/Home";
import OrdersAdmin from "./container/OrdersAdmin/OrdersAdmin";
import Nav from "./components/Nav/Nav";
import MenuAdmin from "./container/MenuAdmin/MenuAdmin";


const App = () => {
  return (
    <div className="App container text-white">
      <Nav/>
      <Routes>
        <Route path="/admin" element={(<Home/>)}/>
        <Route path="/admin/dishes" element={(<MenuAdmin/>)}/>
        <Route path="/admin/orders" element={(<OrdersAdmin/>)}/>
        <Route path="/admin/new-pizza" element={(<FormAdmin/>)}/>
        <Route path="/admin/edit-pizza/:id" element={(<FormAdmin/>)}/>
        <Route path="/" element={(<Home/>)}/>
      </Routes>
    </div>
  );
};

export default App;
