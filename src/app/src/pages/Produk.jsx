import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Produk() {
    const [data, setData] = useState([]);
    const {id} = useParams();

    const fetchData = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_LOCAL}/productsRents/${id}`);
            const {data} = await response.json();
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
            {data.map((data)=>{
                return (
                    <div key={data.produk_id}>
                        <h1>{data.nama_produk}</h1>
                        <p>{data.dekripsi}</p>
                        <p>Harga: Rp. {data.harga_sewa}</p>
                        <p>Stok: {data.stok}</p>
                        <button>Beli</button>
                        <button>Tambah ke Keranjang</button>
                        <div>
                            <h2>Reviews</h2>
                            {data.reviews.map((review) => (
                                <div key={review.review_id}>
                                    <h3>Rating: {review.rating}</h3>
                                    <p>Komentar: {review.komentar}</p>
                                    <p>Tanggal: {review.review_created_at}</p>
                                </div>
                            ))}
                        </div>
                    </div>                        
                )
            })}
        </>
    )
}
