import { useState } from "react"

const StartingScreen = () => {


    const [optionSelected, setOptionSelected] = useState(false);
    const defaultStart = () => {
        setOptionSelected(true);
    }

    return(
        <> 
        { !optionSelected ?
           <> 
                <p>Please Choose Between a Default or Custom Starting Inventory</p>
                <button>Default Inventory</button>
                <button>Custom Inventory</button>
            </>
            :
            <>
                <form method="post" onSubmit={handleSubmit}>
                    <label>
                        Number of Starting Products: <input name="myInput" defaultValue="Some initial value" />
                    </label>
                    <button type="submit">Submit form</button>
                </form>
            </>
        }
        </>
    )
}

export default StartingScreen