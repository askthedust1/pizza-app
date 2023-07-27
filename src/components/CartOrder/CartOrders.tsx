import React from 'react';
import {ICartPizza} from "../../types";
import CartOrder from "./CartOrder";

interface IProps {
    orders: ICartPizza[];
}

const CartOrders: React.FC<IProps> = ({orders}) => {

    return (
        <div>
            {orders.map((item, index) => (
                <CartOrder key={index} cart={item}/>
            ))
            }
        </div>
    );
};

export default CartOrders;