const dbPool = require('../config/database');

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO users (username, password, namalengkap, notelepon, alamat) VALUES ('${body.username}','${body.password}','${body.namalengkap}','${body.notelepon}','${body.alamat}')`;
    return dbPool.execute(SQLQuery);
};

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';
    return dbPool.execute(SQLQuery);
};

const getUserById = (id) => {
    const SQLQuery = `SELECT * FROM users WHERE user_id = ${id}`;
    return dbPool.execute(SQLQuery);
};

const updateUser = async (body, id) => {
    const SQLQuery = `UPDATE users SET 
                      username = '${body.username}', password = '${body.password}', namalengkap = '${body.namalengkap}', notelepon = '${body.notelepon}', alamat = '${body.alamat}' 
                      WHERE user_id = ${id}`;
    return dbPool.execute(SQLQuery);
};

const deleteUser = async (id) => {
    const SQLQuery = `DELETE FROM users WHERE user_id = ${id}`;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
