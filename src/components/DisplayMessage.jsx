import { useEffect, useState } from "react";
import "../styles/DisplayMessage.css";

const DisplayMessage = ({displayMessage, isError=false}) => {
    const [display, setDisplay] = useState(displayMessage)
  
    return(
        <>
        <p className={isError ? "ErrorMessage" : "DisplayMessage"}>{display}</p>
        </>
    )
}

export default DisplayMessage