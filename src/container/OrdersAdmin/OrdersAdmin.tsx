import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchOrdersList} from "../../store/PizzaThunk";
import {orderList, orderLoading} from "../../store/OrderSlice";
import Nav from "../../components/Nav/Nav";
import Spinner from "../../components/Spinner/Spinner";
import OrdersList from "../../components/OrdersList/OrdersList";


const OrdersAdmin = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(orderList);
    const ordersIsLoading = useAppSelector(orderLoading);

    useEffect(() => {
        dispatch(fetchOrdersList());
    }, [dispatch]);

    const totalSumOfOrders = orders.reduce((acc, order) => acc + order.totalSum, 0);


    return (
        <div>
            <Nav/>
            {
                ordersIsLoading ? <Spinner/> : <div>
                    {
                        totalSumOfOrders === 0 ? <div className="fs-2 fw-bold text-center mb-3">No orders yet!</div> :
                            <div className="fs-2 fw-bold text-center mb-3">
                                Total sum for all orders: {totalSumOfOrders} KGS</div>
                    }
                    <div className="row row-cols-1 row-cols-md-1 g-4">
                        <OrdersList orders={orders}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrdersAdmin;