import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {clearCart, order} from "../../store/CartSlice";
import ItemsOrder from "./ItemsOrder";
import Modal from "../../components/Modal/Modal";
import CartOrders from "../../components/CartOrder/CartOrders";
import {createOrder} from "../../store/PizzaThunk";

const Order = () => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const orderList = useAppSelector(order);

    const sum = orderList.reduce((acc, value) => {
        return acc + value.pizzaOrder.price * value.amount;
    }, 0);

    const ordersDispatch = async () => {
        await dispatch(createOrder({order: orderList}));
        await dispatch(clearCart());
        setShow(false);
    };


    return (
        <div>
            <ItemsOrder />
            <div>
                { sum === 0 ? null : <div><h2>Total: {sum}</h2>
                    <button
                        className="w-50 btn btn-primary"
                        onClick={() => setShow(true)}
                    >
                        Checkout
                    </button></div>}
                <Modal show={show} title="Order" onClose={() => setShow(false)}>
                    <div className="modal-body">
                        { sum === 0 ? <div>Nothing to order!</div> : <div>
                            <CartOrders orders={orderList}/>
                            <div>Delivery: 150 KGS</div>
                            <div>Total: {sum + 150} KGS</div>
                        </div>}
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-danger"
                            onClick={() => setShow(false)}
                        >
                            Cancel
                        </button>

                        <button className="btn btn-primary" disabled={sum === 0} onClick={() => dispatch(ordersDispatch)}>Order</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Order;