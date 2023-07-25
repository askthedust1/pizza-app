import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {clear, pizzaDelLoading, pizzaList, pizzaListFetchLoading} from "../../store/PizzaSlice";
import {deletePizza, fetchPizzaList} from "../../store/PizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import ButtonSpinner from "../../components/ButtonSpiner/ButtonSpinner";

const ItemsAdmin = () => {
    const dispatch = useAppDispatch();
    const pizzaItems = useAppSelector(pizzaList);
    const pizzaLoading = useAppSelector(pizzaListFetchLoading);
    const deleteLoading = useAppSelector(pizzaDelLoading);
    const clearData = () => {
        dispatch(clear());
        dispatch(fetchPizzaList());
    };

    useEffect(() => {
        dispatch(fetchPizzaList());
    }, [dispatch]);

    const pizzaDel = async (id: string) => {
        if (window.confirm('Do you really want to delete this pizza?')) {
            await dispatch(deletePizza(id));
            await dispatch(fetchPizzaList());
        }
    };

    let pizzas: React.ReactNode = <Spinner/>;

    if (!pizzaLoading) {
        pizzas = pizzaItems.map((item) => (
            <ItemCard
                key={item.id}
                pizza={item}
            >
                <Link
                    to={'/admin/edit-pizza/' + item.id}
                    className="btn btn-primary me-2">
                    Edit
                </Link>

                <button
                    className="btn btn-danger"
                    onClick={() => pizzaDel(item.id)}
                    disabled={deleteLoading ? deleteLoading === item.id : false}
                >
                    { deleteLoading && deleteLoading === item.id && <ButtonSpinner/> }
                    Delete
                </button>
            </ItemCard>
        ));
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-4">
                <h2>Pizza</h2>
                <Link onClick={clearData} className="btn btn-outline-danger fs-4" to="/admin/new-pizza">Add new pizza</Link>
            </div>
            {pizzas}
        </div>
    );
};

export default ItemsAdmin;