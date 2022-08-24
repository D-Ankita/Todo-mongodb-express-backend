"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class config {
//     statusCode:number, message:string,payload:JSON
// }
const sendResponse = (req, resp, next, config) => {
    const { statusCode, message, payload } = config;
    // const{statusCode:statusCode, message:String,payload:Object} = config;
    // console.log("payload",payload);
    resp.status(statusCode).json({
        message: message,
        data: payload,
    });
};
module.exports = sendResponse;
//# sourceMappingURL=sendResponse.js.map