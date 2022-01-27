import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Tweet = (props) => {

    const { user } = useContext(AuthContext);

    return(
        <div className="Tweet">
            <p>{props.message}</p>
            <p>{props.username}</p>
            <p>{props.likes}</p>
            {user !== null && user.uid === props.uid  && <button onClick={props.delete}>Eliminar Tweet</button>}
        </div>
    );
};

export default Tweet;