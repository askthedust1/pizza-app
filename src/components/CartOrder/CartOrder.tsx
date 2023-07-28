import React from 'react';
import {ICartPizza} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {deleteOne} from "../../store/CartSlice";

interface Props {
    cart: ICartPizza;
}

const CartOrder: React.FC<Props> = ({cart}) => {
    const dispatch = useAppDispatch();
    const price = cart.pizzaOrder.price * cart.amount;

    const delOrder  = (id: string) => {
        dispatch(deleteOne(id));
    }

    return (
        <div>
            <div className="card mb-2 p-2">
                <div className="row align-items-center">
                    <div className="col">{cart.pizzaOrder.name}</div>
                    <div className="col-2">{cart.amount}</div>
                    <div className="col-3 text-rightxp">
                        {price} KGS
                    </div>
                    <button className="button-icon col-2"
                            onClick={() => delOrder(cart.pizzaOrder.id)}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default CartOrder;