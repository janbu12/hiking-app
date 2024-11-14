const ProductModel = require('../models/products_rent');

const createNewProduct = async (req,res) => {
    const {body} = req;
    try {
        await ProductModel.createNewProduct(body);
        res.status(201).json({
            message: 'Product created successfully',
            data: body
        });
    } catch(err){
        console.error('Error creating new user:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const [rows] = await ProductModel.getAllProduct();
        const productsMap = rows.reduce((acc, row) => {
            if (!acc[row.produk_id]) {
                acc[row.produk_id] = {
                    produk_id: row.produk_id,
                    nama_produk: row.nama_produk,
                    deskripsi: row.deskripsi,
                    stok: row.stok,
                    harga_sewa: row.harga_sewa,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    gambar: row.gambar,
                    kategori_id: row.kategori_id,
                    reviews: []
                };
            }

            if (row.review_id) {
                acc[row.produk_id].reviews.push({
                    review_id: row.review_id,
                    user_id: row.user_id,
                    rating: row.rating,
                    komentar: row.komentar,
                    review_created_at: row.review_created_at
                });
            }
            return acc;
        }, {});

        const data = Object.values(productsMap);

        res.json({
            message: 'Get all products success',
            data: data
        });

    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const [rows] = await ProductModel.getProductById(id);
        const productsMap = rows.reduce((acc, row) => {
            if (!acc[row.produk_id]) {
                acc[row.produk_id] = {
                    produk_id: row.produk_id,
                    nama_produk: row.nama_produk,
                    deskripsi: row.deskripsi,
                    stok: row.stok,
                    harga_sewa: row.harga_sewa,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    gambar: row.gambar,
                    kategori_id: row.kategori_id,
                    reviews: []
                };
            }

            if (row.review_id) {
                acc[row.produk_id].reviews.push({
                    review_id: row.review_id,
                    user_id: row.user_id,
                    rating: row.rating,
                    komentar: row.komentar,
                    review_created_at: row.review_created_at
                });
            }
            return acc;
        }, {});

        const data = Object.values(productsMap);
        
        if (data.length == 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
    
        res.json({
            message: 'Get product success',
            data: data
        })
        
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {body} = req;

    try{
        const response = await ProductModel.updateProduct(body, id);
        
        if (response.affectedRows == 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
    
        res.json({
            message: 'Product updated successfully',
            data: body
        });

    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    };
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try{
        const response = await ProductModel.deleteProduct(id);
        
        if (response[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            message: 'Delete product updated successfully'
        });

    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    };
}

module.exports = {
    createNewProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};