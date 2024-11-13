const express = require('express');

const ProductController = require('../controllers/products');

const router = express.Router();

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

router.post('/', ProductController.createNewProduct);

router.patch('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
