import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken"

export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.nextTick.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} Not Authorized For This Resource!`, 403));
    }
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.PATIENTToken
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.nextTick.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} Not Authorized For This Resource!`, 403));
    }
    next();
});