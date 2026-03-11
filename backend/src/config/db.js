const mongoose = require('mongoose')


const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('database is connected');
        
    } catch (error) {
        console.log('database error', error);
        
        
    }

}
module.exports =connectDB;