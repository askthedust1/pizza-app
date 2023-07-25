import React from 'react';
import {IPizzaFull} from "../../types";

interface Props extends React.PropsWithChildren {
    pizza: IPizzaFull;
}

const ItemCard: React.FC<Props> = ({children, pizza}) => {
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
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;