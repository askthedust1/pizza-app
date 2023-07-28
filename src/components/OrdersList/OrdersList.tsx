import React from 'react';
import {IOrdersFull} from "../../types";
import OrderListItems from "./OrderListItems";
import ButtonSpinner from "../ButtonSpiner/ButtonSpinner";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {delOrderLoading} from "../../store/OrderSlice";
import {deleteOrderList, fetchOrdersList} from "../../store/PizzaThunk";

interface IProps {
    orders: IOrdersFull[];
}

const OrdersList: React.FC<IProps> = ({orders}) => {
    const dispatch = useAppDispatch();
    const ordersIsDel = useAppSelector(delOrderLoading);

    const delOrder = async (id: string) => {
        await dispatch(deleteOrderList(id));
        await dispatch(fetchOrdersList());
    };

    return (
        <div>
            {orders.map((item) => (
                <div key={item.orderId} className="card mb-4 p-3">
                    <p className="me-2 fs-3 fw-bold">Orders:</p>
                    <hr />
                    <OrderListItems orders={item} />
                    <hr />
                    <p className="fw-bold fs-3">Delivery: 150 KGS</p>
                    <p className="fw-bold fs-3">Total: {item.totalSum}</p>
                    <div>
                        <button disabled={!!ordersIsDel}
                                onClick={() => delOrder(item.orderId)}
                                className="btn btn-danger fs-3 fw-bold">
                            {ordersIsDel && <ButtonSpinner/>}
                            Complete order
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrdersList;