import React, { createContext, useState} from "react";
import { chosenTheme } from "../constants/theme";


export const ThemeContext = createContext()


export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(chosenTheme)


    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    )

}