import mongoose from 'mongoose';


const connectDB = async () =>  {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`) 
        console.log(`mongoDb CONNECTED....`)
    } catch (error) {
        console.log(error, "connection failed")
        process.exit(1)
    }

}

export default connectDB

