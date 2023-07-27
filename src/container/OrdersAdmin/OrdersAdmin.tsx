import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {orders} from "../../store/PizzaSlice";
import {fetchOrdersList} from "../../store/PizzaThunk";

const OrdersAdmin = () => {
    const dispatch = useAppDispatch();
    const ordersList = useAppSelector(orders);
    console.log(ordersList);

    useEffect(() => {
        dispatch(fetchOrdersList());
    }, [dispatch]);


    return (
        <div>

        </div>
    );
};

export default OrdersAdmin;