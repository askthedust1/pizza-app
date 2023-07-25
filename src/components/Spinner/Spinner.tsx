import React from 'react';

const Spinner = () => {
    return (
        <div className="text-center">"
            <div className="spinner-border text-light" role="status" style={{"width": '5rem', 'height': '5rem'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;