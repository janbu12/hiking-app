import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Produk() {
    const [data, setData] = useState([]);
    const {id} = useParams();

    const fetchData = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_LOCAL}products/${id}`);
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    
    useEffect(() => {
        fetchData(id);
    }, [id]);
    
    console.log(data);
    
    return (
        <>
            <div>Produk {id}</div>
            <h1></h1>
        </>
    )
}
