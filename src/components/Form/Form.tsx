import React, {useState} from 'react';
import {IPizzaBase} from "../../types";
import ButtonSpinner from "../ButtonSpiner/ButtonSpinner";

interface IProps {
    onFormSubmit: (newPizza: IPizzaBase) => void;
    pizza?: IPizzaBase;
    isEdit?: boolean;
    isLoading?: boolean;
}

const Form: React.FC<IProps> = ({pizza, onFormSubmit, isEdit, isLoading}) => {
    const initialState = pizza ? {
        ...pizza
    } : {
        name: '',
        pic: '',
        price: 0,
    };

    const [newPizza, setNewPizza] = useState<IPizzaBase>(initialState);

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setNewPizza(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onFormSubmit({
            ...newPizza,
            price: Number(newPizza.price),
        });
    };

    return (
        <div>
            <div>
                <form onSubmit={onSubmit} className="p-3 w-50 mx-auto text-white">
                    <div className="form-group mb-3 d-flex">
                        <label htmlFor="author" className="form-label fs-4 me-4">Name:</label>
                        <input name="name" value={newPizza.name}
                               type="text"
                               required
                               placeholder="Pizza name"
                               className="form-control"
                               id="name"
                               onChange={inputHandler}/>
                    </div>
                        <div className="mb-3 d-flex me-1">
                            <label htmlFor="author" className="form-label fs-4 me-4">Price:</label>
                            <input name="price" value={newPizza.price}
                                   type="number"
                                   required
                                   className="form-control ms-1"
                                   id="price"
                                   onChange={inputHandler}/>
                        </div>
                    <div className="d-flex mb-3">
                        <label htmlFor="text" className="form-label fs-4 me-4">Photo:</label>
                        <input name="pic" value={newPizza.pic} type="text"
                               className="form-control" placeholder="Add photo"
                               id="pic"
                               onChange={inputHandler}/>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-light fs-5 mt-3">
                            {isLoading && <ButtonSpinner/>}
                            {isEdit ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;