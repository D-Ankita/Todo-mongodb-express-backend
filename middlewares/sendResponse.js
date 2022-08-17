const sendResponse =  (req, resp,next,config)=>{
    
    const{statusCode, message,payload} = config;
    console.log("payload",payload);
     resp.status(statusCode).json({
        message:message,
        data:payload,
        message:message,
    })
}

module.exports = sendResponse