const express = require('express');
const app = new express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());


const hospitalroutes = require('./routes/hospitalroutes');
app.use('/hospitals',hospitalroutes);
app.listen('3001',()=>{
    console.log('Server is running on PORT 3001');
})