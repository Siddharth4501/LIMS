import app from './app.js'

import { config } from 'dotenv';//considers content of env file and execute it
import connectionToDB from './config/dbConnection.js';
config();

const PORT=process.env.PORT || 5001;

app.listen(PORT,async()=>{
    await connectionToDB();
    console.log(`App is running at http:localhost:${PORT}`);
})