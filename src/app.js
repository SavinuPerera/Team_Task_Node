const express = require('express');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');



const app = express();


app.use(express.json());

// 200 means ok
       app.get('/api/health', (_req, res) => {

  res.status(200).json({ message: 'Server is running' });


});



app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery', deliveryRoutes);



app.use((_req, res) => {
  res.status(404).json({ message: '404 error' });
});


// added error handle middleware file eka ain kra


app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
