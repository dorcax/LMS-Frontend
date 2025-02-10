import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterUserMutation } from "@/slices/userSlice";

enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

type FormValue = {
  firstName: string;
  surName: string;
  email: string;
  matricNo: string;
  password: string;
  dob: Date ;
  address: string;
  phoneNumber: string;
  sex: GenderEnum;
};
// validation of data

// Define validation schema using Yupod
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  surName: yup.string().required("Surname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  matricNo: yup.string().required("Matric No is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  dob: yup
    .date()
    .typeError("Invalid date")
    .required("Date of birth is required"),
  address: yup.string().required("Address is required"),
  phoneNumber: yup.string().min(11, "Invalid phone number").required(),
  sex: yup
    .mixed<GenderEnum>()
    .oneOf(Object.values(GenderEnum), "Invalid gender selection")
    .required("Gender is required"),
});

const SignUp = () => {
  const {
    register,
    control,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      surName: "",
      email: "",
      matricNo: "",
      password: "",
      // dob: new Date(), // Default to today's date
      address: "",
      phoneNumber: "",
      sex:undefined, // Default gender
    },
  });
  const [registerUser, { isLoading: loading }] = useRegisterUserMutation();

  // onsubmit
  const onSubmit = async (value: FormValue) => {
    try {
      const formattedData ={
        ...value,
        dob:new Date(value.dob).toISOString()
      }
     console.log("Submitting Form Data:",formattedData);
      const response = await registerUser(formattedData).unwrap();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#F8F9FA] w-full flex justify-center items-center p-6 min-h-screen border text-[#212529]">
      <div className=" bg-white w-full  flex  justify-center gap-4  overflow-hidden shadow-lg rounded-lg  max-w-4xl">
        <div className="md:w-1/2">
          <img
            src="./img/bg-img.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col md:w-1/2 py-14 ">
          <div className="text-center">
            <h2 className="text-green-600 uppercase ">SignUp</h2>
            <p>pls fill in the information to proceed</p>
          </div>
          <form action="w-1/2 " onSubmit={handleSubmit(onSubmit)}>
            <div className="p-2 capitalize text-md ">
              <Label htmlFor="firstName" className="my-2">
                firstName
              </Label>

              <Input className="w-full max-w-sm" {...register("firstName")} />

              {errors.firstName && (
                <p className="text-red-600 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="p-2 capitalize text-md">
              <Label className="my-2">surname</Label>

              <Input className="w-full max-w-sm" {...register("surName")} />

              {errors.surName && (
                <p className="text-red-600 text-xs">{errors.surName.message}</p>
              )}
            </div>
            <div className="p-2 capitalize text-md">
              <Label className="my-2">email</Label>

              <Input
                className="w-full max-w-sm"
                type="email"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="p-2 capitalize text-md">
              <Label className="my-2">matric no</Label>

              <Input className="w-full max-w-sm" {...register("matricNo")} />

              {errors.matricNo && (
                <p className="text-red-600 text-xs">
                  {errors.matricNo.message}
                </p>
              )}
            </div>
            <div className="p-2 capitalize text-md">
              <Label className="my-2">password</Label>

              <Input
                className="w-full max-w-sm"
                type="password"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-red-600 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="p-2 capitalize text-md">
              <Label>address</Label>

              <Input
                className="w-full max-w-sm my-1"
                {...register("address")}
              />

              {errors.address && (
                <p className="text-red-600 text-xs">{errors.address.message}</p>
              )}
            </div>
            <div className="p-2 capitalize text-md flex flex-col text-black">
              <Label>date of birth</Label>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value && new Date(field.value) }
                    onChange={(date) => field.onChange(date?.toISOString())}
                    className="w-full max-w-sm my-1"
                  />
                )}
              />

              {errors.dob && (
                <p className="text-red-600 text-xs">{errors.dob.message}</p>
              )}
            </div>
            <div className="p-2 capitalize text-md">
              <Label>phone number </Label>

              <Input
                className="w-full max-w-sm my-1"
                {...register("phoneNumber")}
              />

              {errors.phoneNumber && (
                <p className="text-red-600 text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="p-2 capitalize text-md">
              <Label>sex</Label>
              <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.sex && (
                <p className="text-red-600 text-xs">{errors.sex.message}</p>
              )}
            </div>
            <div className="px-2 py-6">
              <Button
                className=" w-full max-w-sm capitalize"
                disabled={isLoading}
              >
                sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
