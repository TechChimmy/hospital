import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {} from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password, role } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
  });
  generateToken(user, "User Registered!", 200, res);
  
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All Details!"));
  }

  if (password != confirmPassword) {
    return next(new ErrorHandler("Password and confirmPassword DO NOT MATCH"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email!", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password or Email!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User With this Role NOT FOUND!", 400));
  }

  generateToken(user, "User Login Successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
  const {firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
  } = req.body;  
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegister = await User.findOne({email});
  if(isRegister){
    return next(new ErrorHandler(`${isRegister.role} With This Email Already Exists!`));
  }
  const admin = await User.create({firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin"});
    res.status(200).json({
      success: true,
      message: "New Admin Registered!",
    });
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
  const doctors = await User.find({role: "Doctor"});
  res.status(200).json({
  success: true,
  doctors,
});
});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
  req.status(200).cookie("adminToken", "",{
    httpOnly:true,
    expires: new Date(Date.now()),
  }).json({
    succes: true,
    message: "Admin Logged Out Successfully!",
  });
});

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
  req.status(200).cookie("patientToken", "",{
    httpOnly:true,
    expires: new Date(Date.now()),
  }).json({
    succes: true,
    message: "Patient Logged Out Successfully!",
  });
});

export const addNewDoctor = catchAsyncErrors((req,res,next)=>{
  if(!req.files || Object.keys(req.files).length ===0){
    return next(new ErrorHandler("Doctor Acatar Required!", 400));
  }
  const {docAvatar} = req.files;
  const allowedFormats = ["/image/png", "/image/png", "/image/png"];
  if(!allowedFormats.includes(docAvatar.mimetype)){
    return next(new ErrorHandler("File Format Not Supported", 400));
  }
  const {firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
  doctorDepartment,} = req.body;
  if(
    (!firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !role ||
    !doctorDepartment)
  ){
    
  }
});