import React from "react";

const Tweet = (props) => {

    return(
        <div className="Tweet">
            <p>{props.message}</p>
            <p>{props.author}</p>
            <button onClick={props.delete}>Eliminar Tweet</button>
        </div>
    );
};

export default Tweet;