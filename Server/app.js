import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import morgan from "morgan";
import sampleRoutes from './routes/Sample.routes.js'
import userRoutes from './routes/user.routes.js'
import substanceRoutes from './routes/Substance.routes.js'
import groupRoutes from './routes/Group.routes.js'
import errorRoutes from './routes/Error.routes.js'
import administrationRoutes from './routes/Administration.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';

const app=express();

app.use(cors({
    origin:'http://localhost:5173',
    methods: 'GET,PUT,HEAD,PATCH,POST,DELETE',
    credentials:true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());

//lims main routes
app.use('/api/v1/Sample',sampleRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/Substance',substanceRoutes);
app.use('/api/v1/Group',groupRoutes);
app.use('/api/v1/Error',errorRoutes);
app.use('/api/v1/Administration',administrationRoutes);

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 Page Not Found');
}); //to handle any unknown route

app.use(errorMiddleware);

export default app