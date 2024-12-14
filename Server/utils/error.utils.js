//to show error in proper format
class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);//track error path ,it has two parameter(what to track,on which basis we have to track)
    }
}

export default AppError