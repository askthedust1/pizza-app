import React from 'react';
import {IPizzaFull} from "../../types";
import {Link} from "react-router-dom";
import ButtonSpinner from "../../components/ButtonSpiner/ButtonSpinner";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {pizzaDelLoading} from "../../store/PizzaSlice";
import {deletePizza, fetchPizzaList} from "../../store/PizzaThunk";

interface IProps {
    pizza: IPizzaFull;
}

const ItemAdmin: React.FC<IProps> = ({pizza}) => {
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(pizzaDelLoading);

    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKifIelKpHtAMx-pvtJ75HfTduxyyyUY7ladcbsuNZR7m5kxOLjHmWEEzlbr3fTOx2F0&usqp=CAU';
    const image = pizza.pic || imageUrl;

    const imageStyle: React.CSSProperties = {
        background: `url(${image}) center / cover no-repeat`,
    };

    const pizzaDel = async () => {
        if (window.confirm('Do you really want to delete this pizza?')) {
            await dispatch(deletePizza(pizza.id));
            await dispatch(fetchPizzaList());
        }
    };

    return (
        <div className="card mb-2">
            <div className="row no-gutters">
                <div className="col-sm-4 rounded-start" style={imageStyle}/>
                <div className="col-sm-8 ps-0">
                    <div className="card-body">
                        <h5 className="card-title">{pizza.name}</h5>
                        <p className="card-text">{pizza.price} KGS</p>
                    </div>
                    <div className="card-footer">
                        <Link
                            to={'/admin/edit-pizza/' + pizza.id}
                            className="btn btn-primary me-2">
                            Edit
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={pizzaDel}
                            disabled={deleteLoading ? deleteLoading === pizza.id : false}
                        >
                            { deleteLoading && deleteLoading === pizza.id && <ButtonSpinner/> }
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemAdmin;