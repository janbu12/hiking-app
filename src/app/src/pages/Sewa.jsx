import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Sewa() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
      try {
          setIsLoading(true);
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_LOCAL}/productsRents/`);
          const {data} = await response.json();
          setData(data);
          console.log(data);
      } catch (error) {
          console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
  }

  
  useEffect(() => {
      fetchData();
  }, []);
  
  console.log(data);
    return (
      <>
        {isLoading ? (
          <div>Loading...</div>
        ):(
          <>
            <div>Sewa</div><hr />
            {
              data.map((product) => (
                <div key={product.produk_id}>
                  <h1>{product.nama_produk}</h1>
                  <p>Harga: {product.harga_sewa}</p>
                  <p>Stok: {product.stok}</p>
                  <Link to={`${import.meta.env.VITE_URL_LOCAL}/produk/${product.produk_id}`}>Lihat</Link><hr />
                </div>
              ))
            }
          </>
        )}
      </>
    )
}
