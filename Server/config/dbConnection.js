import mongoose from 'mongoose';

mongoose.set('strictQuery',false)//if required data or query doesn't exist then it helps handling error by not giving error

const connectionToDB=async ()=>{
    try{
        const connection= await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`

        )
        
        if(connection){
            console.log(`Connected to MongoDB: ${connection.connection.host}`,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    } catch(e){
        console.log(e);
        process.exit(1);// exit immediately and cancel all process
    }
}




export default connectionToDB;