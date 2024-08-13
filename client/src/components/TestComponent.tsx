import { useState, useEffect } from "react"
import axios from "axios"



export const TestComponent = () => {

    const [data, setData] = useState([])

    const fetchData =  async() => {
        // ?1st attempt
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/example/api/`);
            if (!response.ok) {
                throw new Error("something wrong Welcome COmp")
            }
            const result = await response.json();
            // console.log(result);
            setData(result);

        } catch(e) {
            console.error('Error fetch', e)
        }


        // ? 2nd attempt
        // console.log("axios url", `${import.meta.env.VITE_API_URL}/example/api/`); 
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/example/api/`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // });
        // console.log("Axios response", response.data);
        // setData(response.data)

        
    }

    useEffect(() => {
        fetchData()
    }, [])


    return(
        <>
        {/* {data.length > 0 ? (
            data.map(item => <div key={data.length}>{item}</div>)
        ): (
            <p>No data found</p>
        )} */}
        {data.map(item =>
            <div key={item.id}>
                <p>{item.user_id}</p>
                <p>{item.name}</p>
            </div>
        )}
    </>
    )
}


