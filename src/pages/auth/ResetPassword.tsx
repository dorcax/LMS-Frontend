import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResetPasswordMutation } from '@/slices/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import  * as yup from "yup"


type formValue ={
    newPassword:string;
    confirmPassword:string
}

const schema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
})
const ResetPassword = () => {
    const[resetPassword,{isLoading}] =useResetPasswordMutation()
    const [searchParam] =useSearchParams()
    const navigate =useNavigate()
    const{register ,formState:{errors},handleSubmit} =useForm<formValue>({
        resolver:yupResolver(schema)
    })


const onSubmit =async(data:formValue)=>{
      const token = searchParam.get("token");

      if (!token) {
        toast.error("Token is missing or invalid");
        return;
      }
 try {
    const value ={
        token,
        newPassword :data.newPassword,
        confirmPassword :data.confirmPassword
    }
    const response =await resetPassword(value).unwrap()
    console.log("response",response)
    toast.success(response.message)
    navigate("/sign-in")

 } catch (error:any) {
    console.log("error",error)
    toast.error(error?.data?.message)
 }

}
  return (
    <div className="bg-[#F8F9FA] flex justify-center   p-6 min-h-screen overflow-hidden">
      <div className="border w-full max-w-3xl bg-white shadow-md rounded-md flex  justify-center">
        {/* image  */}
        <div className="md:w-1/2">
          <img
            src="./img/bg-img.jpg"
            alt=""
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
        {/* end of image */}

        {/* form */}
        <div className=" flex flex-col md:w-1/2  py-14">
          <div className="text-center ">
            <h2 className="capitalize text-2xl font-semibold">
              create new Password
            </h2>
            <p className="text-md pt-2">
              your new password must be different from the previous used
              password
            </p>
          </div>

          <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="m-6">
              <Label className="capitalize"> new password</Label>
              <Input
                placeholder="new password "
                {...register("newPassword")}
                type="password"
              />
              {errors.newPassword && (
                <p className="text-red-600 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="m-6">
              <Label className="capitalize">confirm password</Label>
              <Input
                placeholder="confirm password"
                {...register("confirmPassword")}
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* submit button  */}

            <div className="mx-6 my-4">
              <Button className=" w-full max-w-sm bg-[#1976D2] capitalize "
              disabled={isLoading}>
                {isLoading && (
                  <span className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"></span>
                )}
              {isLoading ?"processing" :"submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword