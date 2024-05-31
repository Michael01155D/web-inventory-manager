import { useState } from "react";
import StartingScreen from "./StartingScreen";
import MainMenu from "./MainMenu";
const HomePage = ({ inventory }) => {
   const [displayStart, setDisplayStart] = useState(true)

    return( 
        <>
        { displayStart ?
         <StartingScreen inventory={inventory} setDisplayStart={setDisplayStart}/>
        :
        <MainMenu inventory={inventory}/>
        }
        </>

    )
}

export default HomePage;