"use client"
import { createContext, useContext, useState } from "react";

export const SearchContext = createContext()

export const SearchProvider = function ({ children }) {
    const [search,setSearch] = useState('')
    const [category,setCategory] = useState('Trending')
    return (
        <SearchContext.Provider value={{search,setSearch,category,setCategory}}>
            {children}
        </SearchContext.Provider>
    )

}

