class AppError extends Error{
    statusCode: number;
    constructor(statusCode:number,message:string){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }  
}
module.exports = AppError