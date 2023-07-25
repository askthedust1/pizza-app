import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from "./container/Admin/Admin";


const App = () => {
  return (
    <div className="App container">
      <Routes>
        <Route path="/admin" element={(<Admin/>)}/>
        <Route path="/admin/dishes" element={(<Admin/>)}/>
        {/*<Route path="/admin/orders" element={(<FormAdmin/>)}/>*/}
      </Routes>
    </div>
  );
};

export default App;
