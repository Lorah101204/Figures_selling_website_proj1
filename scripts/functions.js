const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = 3000;

require('dotenv/config');
const api = process.env.API_URL;

const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const itemsRouter = require('./routers/items')
const ordersRouter = require('./routers/orders')
const categoriesRouter = require('./routers/categories')

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
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

app.listen(PORT, () => {
	console.log(api)
	console.log(`server is running at http://localhost:${PORT}`)
});