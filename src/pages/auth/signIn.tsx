import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLoginUserMutation } from "@/slices/userSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/slices/AuthSlice"; 
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type FormValue = {
  matricNo: string;
  password: string;
};

const schema = yup.object({
  matricNo: yup.string().required("matric no is required"),
  password: yup
    .string()
    .min(6, "password must not be less than 4")
    .required("password is required "),
});
const SignIn = () => {
const[loginUser,{isLoading}] =useLoginUserMutation()
const dispatch =useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      matricNo: "",
      password: "",
    },
  });

  const onSubmit =async (data: FormValue) => {
    try {
        console.log("data",data)
        const response  =await loginUser(data).unwrap()
        dispatch(setCredentials(response))
         toast.success("user logged in ")
        //  navigate user based on role 
    } catch (error:any) {
          console.log(error);
          toast.error(error.data.message)
    }
  
  };

  return (
    <div className="bg-[#F8F9FA] relative flex justify-center  items-center min-h-screen overflow-hidden p-6">
      <div className="  w-full max-w-3xl   bg-white shadow-md rounded-md flex justify-center  h-[600px] ">
        <div className="md:w-1/2">
          <img
            src="./img/bg-img.jpg"
            alt=""
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
        <div className="flex flex-col md:w-1/2 py-14">
          <div className="text-center ">
            <h2 className="text-black text-2xl capitalize font-semibold">
              login
            </h2>
            <p>welcome back </p>
          </div>
          {/* form */}
          <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-6 my-4">
              <label htmlFor="">MatricNo</label>
              <Input
                className="h-10 w-full px-4"
                placeholder="Enter your matric no"
                {...register("matricNo")}
              />
              {errors.matricNo && (
                <p className="text-red-600 text-sm">
                  {errors.matricNo?.message}
                </p>
              )}
            </div>
            <div className="mx-6 my-4">
              <label htmlFor="password">Password</label>
              <Input
                className="h-10 w-full px-4"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between mx-6 my-4">
              <div className="flex items-center space-x-2 ">
                <input type="checkbox" name="" id="" className="w-4 h-4" />
                <span className="text-sm">remember me </span>
              </div>
              <div className="capitalize text-sm hover:underline">
                <Link to="/forgot-password">forgot password?</Link>
              </div>
            </div>
            <div className="m-6">
              <Button
                className="w-full capitalize text-md bg-[#1976D2] hover:bg-[#1976d2c4]"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="w-6 h-6 rounded-full border-2 border-white  animate-spin border-t-transparent"></span>
                )}
                {isLoading ? "submitting" : "sign In"}
              </Button>
            </div>

            <p className="text-center text-md my-3">
              Dont have an account ?{" "}
              <span className="text-[#1976D2]">
                <Link to="/sign-up">sign up here</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
