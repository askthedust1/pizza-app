import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from "./container/Admin/Admin";
import FormAdmin from "./container/FormAdmin/FormAdmin";
import Home from "./container/Home/Home";
import OrdersAdmin from "./container/OrdersAdmin/OrdersAdmin";


const App = () => {
  return (
    <div className="App container text-white">
      <Routes>
        <Route path="/admin" element={(<Admin/>)}/>
        <Route path="/admin/dishes" element={(<Admin/>)}/>
        <Route path="/admin/orders" element={(<OrdersAdmin/>)}/>
        <Route path="/admin/new-pizza" element={(<FormAdmin/>)}/>
        <Route path="/admin/edit-pizza/:id" element={(<FormAdmin/>)}/>
        <Route path="/" element={(<Home/>)}/>
      </Routes>
    </div>
  );
};

export default App;
