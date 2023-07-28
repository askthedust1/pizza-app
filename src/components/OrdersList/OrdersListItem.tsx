import React from 'react';
import {IOrdersInfo} from "../../types";

interface Props {
    dish: IOrdersInfo;
}

const OrdersListItem: React.FC<Props> = ({dish}) => {
    return (
            <div className="d-flex" key={dish.name}>
                <p className="me-2 fs-3">{dish.name}</p>
                <p className="me-2 fs-3">x {dish.amount}</p>
                <p className="me-2 fs-3">= {dish.price * dish.amount} KGS</p>
            </div>
    );
};

export default OrdersListItem;