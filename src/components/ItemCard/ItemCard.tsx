import React from 'react';
import {IPizzaFull} from "../../types";

interface Props extends React.PropsWithChildren {
    pizza: IPizzaFull;
}

const ItemCard: React.FC<Props> = ({children, pizza}) => {
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKifIelKpHtAMx-pvtJ75HfTduxyyyUY7ladcbsuNZR7m5kxOLjHmWEEzlbr3fTOx2F0&usqp=CAU';
    const image = pizza.pic || imageUrl;

    const imageStyle: React.CSSProperties = {
        background: `url(${image}) bottom center / cover no-repeat`,
        height: '250px'
    };

    return (
    <div className="col">
        <div className="card h-100">
            <div className="card-img-top" style={imageStyle}/>
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="card-title fs-4 fw-bold">{pizza.name}</h5>
                        <p className="card-text">{pizza.price} KGS</p>
                    </div>
                    {children}
                </div>

        </div>
    </div>
    );
};

export default ItemCard;