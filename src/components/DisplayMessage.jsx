import { useEffect, useState } from "react";
import "../styles/DisplayMessage.css";

const DisplayMessage = ({displayMessage, isError=false, setIs}) => {
    const [display, setDisplay] = useState(displayMessage)
  
    return(
        <>
        <p className={isError ? "ErrorMessage" : "DisplayMessage"}>{display}</p>
        </>
    )
}

    export const toggleMessage = (setIsError, setDisplayMsg) => {
    setTimeout(() => {
        setIsError(false);
        setDisplayMsg("");
    }, 1500);
}


export default DisplayMessage