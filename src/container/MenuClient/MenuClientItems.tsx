import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {pizzaList} from "../../store/PizzaSlice";
import {fetchPizzaList} from "../../store/PizzaThunk";
import ItemCard from "../../components/ItemCard/ItemCard";
import {addPizzas} from "../../store/CartSlice";
import {IPizzaFull} from "../../types";


const MenuClientItems = () => {
    const dispatch = useAppDispatch();
    const pizzaItems = useAppSelector(pizzaList);

    useEffect(() => {
        dispatch(fetchPizzaList());
    }, [dispatch]);

    const addPizzaToCart = (pizza: IPizzaFull) => {
        dispatch(addPizzas(pizza));
    };

    if (pizzaItems.length === 0) {
        return <div>
            <p>No dishes yet!</p>
        </div>
    }

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
            {
                pizzaItems.map((item) => (
                    <ItemCard
                        key={item.id}
                        pizza={item}
                    >
                        <button
                            className="btn me-2 fs-5"
                            style={{background:'#e85319',
                                color:'white',
                                fontWeight:'700'}}
                            onClick={() => addPizzaToCart(item)}
                        >
                            Add
                        </button>
                    </ItemCard>
                ))
            }
        </div>
    );
};

export default MenuClientItems;