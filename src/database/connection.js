const mongoose = require('mongoose');

const uri = process.env.MONGODB

try{
    mongoose.connect(uri).then(()=>{
        console.log("connected")
    })
    
}catch(e){
    console.log(e)
} finally{
    mongoose.close
}

module.exports = mongoose;