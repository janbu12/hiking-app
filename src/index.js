require('dotenv').config()
const express = require('express');
const cors = require('cors');
const logRequest = require('./middleware/logs');
const UserRoute = require('./routes/users');
const ProductRoute = require('./routes/products_rent');
const RentsRoute = require('./routes/rents');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(logRequest);

app.use('/users', UserRoute);
app.use('/productsRents', ProductRoute);
app.use('/rents', RentsRoute);


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});

