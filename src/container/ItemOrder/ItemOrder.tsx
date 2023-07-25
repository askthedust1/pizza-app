import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {pizzaList, pizzaListFetchLoading} from "../../store/PizzaSlice";

const ItemOrder = () => {
    const dispatch = useAppDispatch();
    const pizzaItems = useAppSelector(pizzaList);
    const pizzaLoading = useAppSelector(pizzaListFetchLoading);

    return (
            <></>
    );
};

export default ItemOrder;