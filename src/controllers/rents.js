const RentsModel = require('../models/rents');

const createNewRent = async (req,res) => {
    const {body} = req;
    try {
        await RentsModel.createNewRent(body);
        res.status(201).json({
            message: 'Rent created successfully',
            data: body
        });
    } catch(err){
        console.error('Error creating new Rent:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    }
}

const getAllRents = async (req, res) => {
    try {
        const [rows] = await RentsModel.getAllRents();

        const rentsMap = rows.reduce((acc, row) => {
            if (!acc[row.id_peminjaman]) {
                acc[row.id_peminjaman] = {
                    id_peminjaman: row.id_peminjaman,
                    user_id: row.user_id,
                    tanggal_pinjam: row.tanggal_pinjam,
                    tanggal_kembali: row.tanggal_kembali,
                    status_peminjaman: row.status_peminjaman,
                    total_harga: row.total_harga,
                    details: []
                };
            }

            if (row.produk_id) {
                acc[row.id_peminjaman].details.push({
                    produk_id: row.produk_id,
                    jumlah: row.jumlah,
                    subtotal: row.subtotal,
                });
            }
            return acc;
        }, {});

        const data = Object.values(rentsMap);

        res.json({
            message: 'Get all Rents success',
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

const getRentById = async (req, res) => {
    try {
        const {id} = req.params;
        const [rows] = await RentsModel.getRentById(id);

        const rentsMap = rows.reduce((acc, row) => {
            if (!acc[row.id_peminjaman]) {
                acc[row.id_peminjaman] = {
                    id_peminjaman: row.id_peminjaman,
                    user_id: row.user_id,
                    tanggal_pinjam: row.tanggal_pinjam,
                    tanggal_kembali: row.tanggal_kembali,
                    status_peminjaman: row.status_peminjaman,
                    total_harga: row.total_harga,
                    details: []
                };
            }

            if (row.produk_id) {
                acc[row.id_peminjaman].details.push({
                    produk_id: row.produk_id,
                    jumlah: row.jumlah,
                    subtotal: row.subtotal,
                });
            }
            return acc;
        }, {});

        const data = Object.values(rentsMap);
        
        if (data.length == 0) {
            return res.status(404).json({ error: 'Rent not found' });
        }
    
        res.json({
            message: 'Get Rent success',
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

const updateRent = async (req, res) => {
    const {id} = req.params;
    const {body} = req;

    try{
        const response = await RentsModel.updateRent(body, id);
        
        if (response.affectedRows == 0) {
            return res.status(404).json({ error: 'Rent not found' });
        }
    
        res.json({
            message: 'Rent updated successfully',
            data: body
        });

    } catch (err) {
        console.error('Error updating Rent:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    };
}

const deleteRent = async (req, res) => {
    const {id} = req.params;

    try{
        const response = await RentsModel.deleteRent(id);
        
        if (response[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Rent not found' });
        }

        res.json({
            message: 'Delete Rent updated successfully'
        });

    } catch (err) {
        console.error('Error updating Rent:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    };
}

module.exports = {
    createNewRent,
    getAllRents,
    getRentById,
    updateRent,
    deleteRent
};