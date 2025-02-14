import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForgotPasswordMutation } from "@/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type FormValue = {
  email: string;
};

const schema = yup.object({
  email: yup.string().email("invalid email").required("email is required"),
});
const ForgotPassword = () => {
  const [forgotPassword,{isLoading}] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  // handle form submission
  const onSubmit = async (data: FormValue) => {
    try {
      const response = await forgotPassword(data).unwrap();
      console.log("Response:", response);

      if (response?.message) {
        toast.success(response.message); // ✅ Check if message exists
      } else {
        toast.success("Reset link sent successfully!");
      }

      navigate("/reset-password");
    } catch (error: any) {
      console.error("Error:", error);

     
      const errorMessage =
        error?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-[#F8F9FA] flex justify-center items-center min-h-screen p-6 overflow-hidden ">
      <div className="w-full max-w-3xl flex justify-center bg-white shadow-md rounded-md h-[600px]">
        <div className="md:w-1/2">
          <img
            src="./img/bg-img.jpg"
            alt=""
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
        <div className="flex flex-col md:w-1/2 py-14 ">
          <div className="text-center ">
            <h2 className="capitalize text-2xl font-semibold">
              forgot password{" "}
            </h2>
            <p className="text-md">Enter your registered email address </p>
          </div>

          {/* form */}
          <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="m-6">
              <Label>Email</Label>
              <Input
                placeholder="Enter your  email"
                className="h-12 w-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <Button
              className="mx-6 w-36 capitalize text-md bg-[#1976D2]"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"></span>
              )}
              {isLoading ? "processing" : "submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
