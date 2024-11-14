const express = require('express');

const RentController = require('../controllers/rents');

const router = express.Router();

router.get('/', RentController.getAllRents);

router.get('/:id', RentController.getRentById);

router.post('/', RentController.createNewRent);

router.patch('/:id', RentController.updateRent);

router.delete('/:id', RentController.deleteRent);

module.exports = router;
