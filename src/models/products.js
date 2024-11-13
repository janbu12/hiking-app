const dbPool = require('../config/database');

const createNewProduct = (body) => {
    const SQLQuery = `INSERT INTO products (nama_produk, deskripsi, stok, harga_sewa, gambar, kategori_id) VALUES ('${body.nama_produk}','${body.deskripsi}','${body.stok}','${body.harga_sewa}','${body.gambar}', '${body.kategori_id}')`;
    return dbPool.execute(SQLQuery);
};

const getAllProduct = () => {
    const SQLQuery = `SELECT * FROM products LEFT JOIN reviews ON products.produk_id = reviews.produk_id`;
    return dbPool.execute(SQLQuery);
};

const getProductById = (id) => {
    const SQLQuery = `SELECT * FROM products WHERE produk_id = ${id}`;
    return dbPool.execute(SQLQuery);
};

const updateProduct = async (body, id) => {
    const SQLQuery = `UPDATE products SET 
                      nama_produk = '${body.nama_produk}', deskripsi = '${body.deskripsi}', stok = '${body.stok}', harga_sewa = '${body.harga_sewa}', gambar = '${body.gambar}', kategori_id = '${body.kategori_id}'
                      WHERE produk_id = ${id}`;
    return dbPool.execute(SQLQuery);
};

const deleteProduct = async (id) => {
    const SQLQuery = `DELETE FROM products WHERE produk_id = ${id}`;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    createNewProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
