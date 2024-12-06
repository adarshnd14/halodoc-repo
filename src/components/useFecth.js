import React, { useEffect, useState } from 'react'

function useFecth(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchdata(url);
    }, [url]);

    const fetchdata = async() => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
        } catch (error) {
            console.log("error", error);
        }
    }
  return data;
}

export default useFecth