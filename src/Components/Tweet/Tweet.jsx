import React from "react";

const Tweet = (props) => {

    return(
        <div className="Tweet">
            <p>{props.message}</p>
            <p>{props.author}</p>
        </div>
    );
};

export default Tweet;