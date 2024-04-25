import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ApiContext = createContext();

export default function ApiContextProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const [myApi, setMyApi] = useState([]);
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(25);

    const [index, setIndex] = useState(0);
    const [lindex, setLindex] = useState(0);
    
    const [page, setPage] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);



    // useEffect(() => {
    //     let existingApiItem = localStorage.getItem("Api");
    //     if (existingApiItem) setApi(JSON.parse(existingApiItem));
    // }, []);

    async function fetchApiData() {
        setLoading(true)
        try {

            const response = await axios.post("http://localhost:4000/api/v1/getApiData",{index:index,size:size});

            if (response && response.data) {
                setMyApi(response.data);
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }
    async function fetchApiCount() {
        setLoading(true)
        try {

            const response = await axios.get("http://localhost:4000/api/v1/getApiCount");

            if (response && response.data) {
                setCount(response.data);
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchApiCount()
        setLindex((Math.ceil(count / size) - 1) * size)
        setPage((Math.ceil(count / size)))
        fetchApiData()
    }, [index, count,size]);
   

    const value = {
        loading, setLoading, fetchApiData, fetchApiCount, lindex, setLindex, myApi, setMyApi, size, setSize, index, setIndex, page, setPage, pageIndex, setPageIndex, count, setCount
    };
    return <ApiContext.Provider value={value}>
        {children}
    </ApiContext.Provider>
}