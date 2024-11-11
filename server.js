const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const Port = 8191
const dbUrl = 'mongodb+srv://sureshkumar1202028:suresh9234@cluster0.v42mwb3.mongodb.net/test'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/product', productRoutes);

const dbConnection = async()=>{
  try{
    const connect = await mongoose.connect(dbUrl)
    console.log('Connected to MongoDB')
  }catch(e){
    console.log('Could not connect to MongoDB ', e)
  }
}
dbConnection()
app.listen(Port, (err) => console.log(`Server started on port ${Port}`));