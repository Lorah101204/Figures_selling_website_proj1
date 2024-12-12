const express = require('express')
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
app.use(`${api}/users`, usersRouter);
/*
app.get('/', (req, res) => {
	res.send('Hello API!');
});
*/
const Product = require('./models/product')

mongoose.connect(process.env.CONNECTION, {
	dbName: 'store'
})
.then(() => {
	console.log('Db connected succesfully');
})
.catch((err) => {
	console.log('err');
})

app.listen(PORT, () => {
	console.log(api)
	console.log(`server is running at http://localhost:${PORT}`)
});