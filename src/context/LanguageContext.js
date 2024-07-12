import React, { useState, createContext } from 'react';
import en from "../languageConfig/en";

let lang = {};
lang = en;

export const LanguageContext = createContext();

export const LanguageProvider = (props) => {

    const [I18n, changeLanguage] = useState(lang)

    return (
        <LanguageContext.Provider value={[I18n, changeLanguage]}>
            {props.children}
        </LanguageContext.Provider>
    )
}