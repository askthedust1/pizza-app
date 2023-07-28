import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {clear, pizzaDelLoading, pizzaList, pizzaListFetchLoading} from "../../store/PizzaSlice";
import {deletePizza, fetchPizzaList} from "../../store/PizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import ButtonSpinner from "../../components/ButtonSpiner/ButtonSpinner";

const MenuAdmin = () => {
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
                <div>
                    <Link
                        to={'/admin/edit-pizza/' + item.id}
                        className="button-edit">
                    </Link>

                    <button
                        className="button-icon"
                        style={{width:'40px',height:'40px'}}
                        onClick={() => pizzaDel(item.id)}
                        disabled={deleteLoading ? deleteLoading === item.id : false}
                    >
                        { deleteLoading && deleteLoading === item.id && <ButtonSpinner/> }
                    </button>
                </div>
            </ItemCard>
        ));
    }

    return (
        <div>
            <div className="mb-4 ms-2">
                <Link onClick={clearData} style={{color: '#e85319'}} className="btn btn-light fs-4" to="/admin/new-pizza">Add new pizza</Link>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {pizzas}
            </div>

        </div>
    );
};

export default MenuAdmin;