export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export type RegisterData={
   firstName: string;
  surName: string;
  email: string;
  matricNo: string;
  password: string;
  dob: Date |string;
  address: string;
  phoneNumber: string;
  sex: GenderEnum;
}
export type RegisterResponse = {
  firstName: string;
  surName: string;
  email: string;
  matricNo: string;
  password: string;
  dob: string;
  address: string;
  phoneNumber: string;
  sex: string;
};

// Type for login request body
export type LoginDetail = {
  matricNo: string;
  password: string;
};

// Response type for login request
export type LoginResponse = {
  token: string;
  user: RegisterResponse;
};
export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type resetPasswordRequest = {
  newPassword: string;
  confirmPassword:string
};
export type resetPasswordResponse = {
  message: string;
};

