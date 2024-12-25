const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

require('dotenv/config');
const api = process.env.API_URL;

const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const itemsRouter = require('./routers/items')
const ordersRouter = require('./routers/orders')
const categoriesRouter = require('./routers/categories')

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler);

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
/*
app.get('/', (req, res) => {
	res.send('Hello API!');
});
*/

mongoose.connect(process.env.CONNECTION, {
	dbName: 'store'
})
.then(() => {
	console.log('Db connected succesfully');
})
.catch((err) => {
	console.log('err');
})

app.listen(process.env.PORT, () => {
	console.log(api)
	console.log(`server is running at http://localhost:${process.env.PORT}`)
});