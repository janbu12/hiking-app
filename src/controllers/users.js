const UsersModel = require('../models/users');

const createNewUser = async (req,res) => {
    const {body} = req;
    try {
        await UsersModel.createNewUser(body);
        res.status(201).json({
            message: 'User created successfully',
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

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers();
    
        res.json({
            message: 'Get all users success',
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

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const [data] = await UsersModel.getUserById(id);
        
        if (data.length == 0) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({
            message: 'Get all users success',
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

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {body} = req;

    try{
        const response = await UsersModel.updateUser(body, id);
        
        if (response.affectedRows == 0) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({
            message: 'User updated successfully',
            data: body
        });

    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    };
}

const deleteUser = async (req, res) => {
    const {id} = req.params;

    try{
        const response = await UsersModel.deleteUser(id);
        
        if (response[0].affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Delete user updated successfully'
        });

    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        });
    };
}

module.exports = {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};