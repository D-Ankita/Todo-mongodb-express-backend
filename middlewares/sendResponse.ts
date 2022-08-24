import { Request, Response, NextFunction } from 'express';
import { StatusCodes,} from 'http-status-codes';
// class config {
//     statusCode:number, message:string,payload:JSON
// }
const sendResponse =  (req:Request, resp:Response,next:NextFunction,config:{statusCode:number, message:string,payload:JSON})=>{
    const{statusCode, message,payload} = config;
    // const{statusCode:statusCode, message:String,payload:Object} = config;
    // console.log("payload",payload);
     resp.status(statusCode).json({
        message: message,
        data:payload,
    })
}

module.exports = sendResponse