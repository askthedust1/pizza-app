import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {createPizza, fetchOne, updatePizza} from "../../store/PizzaThunk";
import {IPizzaBase} from "../../types";
import {onePizza, pizzaCreateLoading, pizzaFetchOneLoading, pizzaUpdateLoading} from "../../store/PizzaSlice";
import Form from "../../components/Form/Form";
import Spinner from "../../components/Spinner/Spinner";

const FormAdmin = () => {
    const { id } = useParams() as {id: string};
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pizzaOne = useAppSelector(onePizza);
    const fetchPizzaLoading = useAppSelector(pizzaFetchOneLoading);
    const updateLoading = useAppSelector(pizzaUpdateLoading);
    const addLoading = useAppSelector(pizzaCreateLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOne(id));
        }
    }, [dispatch, id]);

    const editContact = async (pizza: IPizzaBase) => {
        await dispatch(updatePizza({id, pizza}));
        navigate('/admin');
    };

    const addContact = async (newPizza: IPizzaBase) => {
        await dispatch(createPizza(newPizza));
        navigate('/admin');
    };

    // if (!pizzaOne) {
    //     return <div>
    //
    //         <Form onFormSubmit={addContact} isLoading={addLoading}/>
    //     </div>
    // }


    return (
        <div>
            {
                pizzaOne ?
                    <div>{fetchPizzaLoading ? <Spinner/> : <Form onFormSubmit={editContact} isLoading={updateLoading} isEdit pizza={pizzaOne} />}</div>
                    : <Form onFormSubmit={addContact} isLoading={addLoading}/>
            }
        </div>
    );
};

export default FormAdmin;