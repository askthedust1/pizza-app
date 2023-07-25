import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {pizzaList, pizzaListFetchLoading} from "../../store/PizzaSlice";
import {fetchPizzaList} from "../../store/PizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import ItemAdmin from "./ItemAdmin";
import {Link} from "react-router-dom";

const ItemsAdmin = () => {
    const dispatch = useAppDispatch();
    const pizzaItems = useAppSelector(pizzaList);
    const pizzaLoading = useAppSelector(pizzaListFetchLoading);

    useEffect(() => {
        dispatch(fetchPizzaList());
    }, [dispatch]);

    let pizzas: React.ReactNode = <Spinner/>;

    if (!pizzaLoading) {
        pizzas = pizzaItems.map((item) => (
            <ItemAdmin
                key={item.id}
                pizza={item}
            />
        ));
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-4">
                <h2>Pizza</h2>
                <Link className="btn btn-outline-danger fs-4" to="/admin/new-pizza">Add new pizza</Link>
            </div>
            {pizzas}
        </div>
    );
};

export default ItemsAdmin;