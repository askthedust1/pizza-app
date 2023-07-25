import React from 'react';
import {IPizzaFull} from "../../types";
import {Link} from "react-router-dom";

interface IProps {
    pizza: IPizzaFull;
}

const ItemAdmin: React.FC<IProps> = ({pizza}) => {
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKifIelKpHtAMx-pvtJ75HfTduxyyyUY7ladcbsuNZR7m5kxOLjHmWEEzlbr3fTOx2F0&usqp=CAU';
    const image = pizza.pic || imageUrl;

    const imageStyle: React.CSSProperties = {
        background: `url(${image}) center / cover no-repeat`,
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
                            to={'/edit-pizza/' + pizza.id}
                            className="btn btn-primary me-2">
                            Edit
                        </Link>

                        <button
                            className="btn btn-danger"
                            // onClick={onDelete}
                            // disabled={deleteLoading ? deleteLoading === pizza.id : false}
                        >
                            {/*{ deleteLoading && deleteLoading === pizza.id && <ButtonSpinner/> }*/}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemAdmin;