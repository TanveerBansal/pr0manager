
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ProManager')
.then(()=>{
    console.log("DB Connection Successfull");
})
.catch((err)=>{
    console.log("Error in Db Connection", err);
})