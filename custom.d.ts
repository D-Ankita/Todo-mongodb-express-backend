
declare namespace Express {
    export interface Request {
        task?: object
        query?:{
            page:number;
            limit:number
        }
        toggleIsComplete?:boolean
        containsValidBody?:boolean
    }
 }