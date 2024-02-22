import { createContext, useState } from "react";
import axios from "axios";
export const historyContext = createContext({
    currenthistory: [],
    handlehistory: () => { },
    
})

// provider
export default function HistoryProvider({ children }) {
    const [currenthistory, setCurrentHistory] = useState([])

    async function handlehistory() {
        const {data} = await axios.get('http://localhost:3000/history', {headers: {Authorization: `Bearer ${localStorage.access_token}`}})
        setCurrentHistory(data)
    }

    return (
        <historyContext.Provider value={
            {
                currenthistory,
                handlehistory,
            }
        }>
            {children}
        </historyContext.Provider>
    )
}
