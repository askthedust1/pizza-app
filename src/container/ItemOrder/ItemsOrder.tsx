import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {pizzaList, pizzaListFetchLoading} from "../../store/PizzaSlice";
import {fetchPizzaList} from "../../store/PizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";
import {addPizzas, order} from "../../store/CartSlice";
import {IPizzaFull} from "../../types";


const ItemsOrder = () => {
    const dispatch = useAppDispatch();
    const pizzaItems = useAppSelector(pizzaList);
    const pizzaLoading = useAppSelector(pizzaListFetchLoading);
    const orderList = useAppSelector(order);

    const sum = orderList.reduce((acc, value) => {
        return acc + value.pizzaOrder.price * value.amount;
    }, 0);


    useEffect(() => {
        dispatch(fetchPizzaList());
    }, [dispatch]);

    const addPizzaToCart = (pizza: IPizzaFull) => {
        dispatch(addPizzas(pizza));
    };

    let pizzas: React.ReactNode = <Spinner/>;

    if (!pizzaLoading) {
        pizzas = pizzaItems.map((item) => (
            <ItemCard
                key={item.id}
                pizza={item}
            >
                <button
                    className="btn btn-success me-2"
                    onClick={() => addPizzaToCart(item)}
                >
                    Add
                </button>
            </ItemCard>
        ));
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-4">
                <h2>Pizza Menu</h2>
                <h2>Total: {sum}</h2>
            </div>
            {pizzas}
            <button
                className="w-100 btn btn-primary"
                onClick={() => console.log('order')}
            >
                Order
            </button>
        </div>
    );
};

export default ItemsOrder;