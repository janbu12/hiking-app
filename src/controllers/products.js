const ProductModel = require('../models/products');

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
        const [data] = await ProductModel.getAllProduct();
    
        res.json({
            message: 'Get all products success',
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

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const [data] = await ProductModel.getProductById(id);
        
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