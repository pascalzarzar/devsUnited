import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Tweet = (props) => {

    const { user, setUser } = useContext(AuthContext);
    return(
        <div className="Tweet">
            <p>{props.message}</p>
            <p>{props.author}</p>
            {user && <button onClick={props.delete}>Eliminar Tweet</button>}
            {user && <button onClick={props.edit}>Editar Tweet</button>}
        </div>
    );
};

export default Tweet;