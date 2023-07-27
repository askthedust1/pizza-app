import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {pizzaList, pizzaListFetchLoading} from "../../store/PizzaSlice";
import {fetchPizzaList} from "../../store/PizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";
import {addPizzas} from "../../store/CartSlice";
import {IPizzaFull} from "../../types";


const ItemsOrder = () => {
    const dispatch = useAppDispatch();
    const pizzaItems = useAppSelector(pizzaList);
    const pizzaLoading = useAppSelector(pizzaListFetchLoading);

    useEffect(() => {
        dispatch(fetchPizzaList());
    }, [dispatch]);

    const addPizzaToCart = (pizza: IPizzaFull) => {
        dispatch(addPizzas(pizza));
    };

    let pizzas: React.ReactNode = <Spinner/>;

    if (pizzaItems.length === 0) {
        return <div>
            <p>No dishes yet!</p>
        </div>
    }

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
            </div>
            {pizzas}
        </div>
    );
};

export default ItemsOrder;