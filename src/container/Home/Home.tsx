import React from 'react';
import MenuOrder from "../MenuClient/MenuOrder";
import {useLocation} from "react-router-dom";
import MenuAdmin from "../MenuAdmin/MenuAdmin";

const Home = () => {
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    if (isAdminPage) {
        return <MenuAdmin/>
    }

    return (
        <div>
          <MenuOrder/>
        </div>
    );
};

export default Home;