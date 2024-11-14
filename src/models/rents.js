const dbPool = require('../config/database');

const createNewRent = (body) => {
    const SQLQuery = `INSERT INTO rents (user_id, tanggal_pinjam, tanggal_kembali, status_peminjaman, total_harga) VALUES ('${body.user_id}','${body.tanggal_pinjam}','${body.tanggal_kembali}','${body.status_peminjaman}','${body.total_harga}')`;
    return dbPool.execute(SQLQuery);
};

const getAllRents = () => {
    const SQLQuery = `
    SELECT 
        rents.id_peminjaman, 
        rents.user_id,
        CONVERT_TZ(rents.tanggal_pinjam, '+00:00', '+07:00') AS tanggal_pinjam,
        CONVERT_TZ(rents.tanggal_kembali, '+00:00', '+07:00') AS tanggal_kembali, 
        rents.status_peminjaman,
        rents.total_harga,
        rent_details.produk_id,
        rent_details.jumlah,
        rent_details.subtotal
    FROM 
        rents
    JOIN 
        rent_details 
    ON 
        rents.id_peminjaman = rent_details.id_peminjaman
`;
    return dbPool.execute(SQLQuery);
};

const getRentById = (id) => {
    const SQLQuery = `
    SELECT 
        rents.id_peminjaman, 
        CONVERT_TZ(rents.tanggal_pinjam, '+00:00', '+07:00') AS tanggal_pinjam,
        CONVERT_TZ(rents.tanggal_kembali, '+00:00', '+07:00') AS tanggal_kembali, 
        rents.status_peminjaman,
        rents.total_harga,
        rent_details.produk_id,
        rent_details.jumlah,
        rent_details.subtotal
    FROM 
        rents
    JOIN 
        rent_details 
    ON 
        rents.id_peminjaman = rent_details.id_peminjaman
    WHERE rents.id_peminjaman = ${id}
`;
    return dbPool.execute(SQLQuery);
};

const updateRent = async (body, id) => {
    const SQLQuery = `
        UPDATE rents SET 
            ${body.user_id ? `user_id = '${body.user_id}',` : ''}
            ${body.tanggal_pinjam ? `tanggal_pinjam = '${body.tanggal_pinjam}',` : ''}
            ${body.tanggal_kembali ? `tanggal_kembali = '${body.tanggal_kembali}',` : ''}
            ${body.status_peminjaman ? `status_peminjaman = '${body.status_peminjaman}'` : ''}
        WHERE id_peminjaman = ${id};
    `;
    return dbPool.execute(SQLQuery);
};

const deleteRent = async (id) => {
    const SQLQuery = `DELETE FROM rents WHERE id_peminjaman = ${id}`;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    createNewRent,
    getAllRents,
    getRentById,
    updateRent,
    deleteRent
};
