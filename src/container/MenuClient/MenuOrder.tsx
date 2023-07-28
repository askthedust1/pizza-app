import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {clearCart, order, sendOrderLoading} from "../../store/CartSlice";
import MenuClientItems from "./MenuClientItems";
import Modal from "../../components/Modal/Modal";
import CartOrders from "../../components/CartOrder/CartOrders";
import {createOrder} from "../../store/PizzaThunk";
import NavClient from "../../components/Nav/NavClient";
import ButtonSpinner from "../../components/ButtonSpiner/ButtonSpinner";

const MenuOrder = () => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const orderList = useAppSelector(order);
    const sendOrderSpinner = useAppSelector(sendOrderLoading);

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
            <div className="d-flex justify-content-between mb-4">
                <NavClient/>
                <div>
                    { sum === 0 ? null : <div className="d-flex align-items-center"><h2>Total: {sum}</h2>
                        <button
                            className="btn btn-light fw-bold ms-3 fs-4"
                            style={{color: '#e85319'}}
                            onClick={() => setShow(true)}
                        >
                            Checkout
                        </button></div>}
                </div>
            </div>

            <MenuClientItems />
            <div>
                <Modal show={show} title="Order" onClose={() => setShow(false)}>
                    <div className="modal-body">
                        { sum === 0 ? <div className="text-black">Nothing to order!</div> :
                            <div className="text-black">
                            <CartOrders orders={orderList}/>
                            <div  className="d-flex justify-content-between">
                                <div className="fw-bold">Delivery: 150 KGS</div>
                                <div className="fw-bold text-danger">Total: {sum + 150} KGS</div>
                            </div>
                        </div>}
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-danger"
                            onClick={() => setShow(false)}
                        >
                            Cancel
                        </button>

                        <button className="btn btn-primary"
                                disabled={sum === 0 || sendOrderSpinner}
                                onClick={() => dispatch(ordersDispatch)}>
                            {sendOrderSpinner && <ButtonSpinner/>}
                            Order
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default MenuOrder;