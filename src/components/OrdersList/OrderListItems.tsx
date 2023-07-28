import React from 'react';
import { IOrdersFull} from "../../types";
import OrdersListItem from "./OrdersListItem";

interface IProps {
    orders: IOrdersFull;
}

const OrderListItems: React.FC<IProps> = ({orders}) => {
    return (
        <>
            {orders.pizzas.map((dish, index) => (
                <OrdersListItem key={index} dish={dish}/>
            ))}
        </>
    );
};

export default OrderListItems;