import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

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
  res.status(200).json({
    success: true,
    message: "User Registered!",
  });
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

  res.status(200).json({
    success: true,
    message: "User Logged In Successfully!",
  });
});
