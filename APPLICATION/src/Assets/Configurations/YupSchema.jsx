import * as yup from "yup";

export const loginYupSchema = yup.object({
  email: yup.string().trim().required("email can not be an empty!"),
  password: yup
    .string()
    .trim()
    .required("password  can not be an empty!")
    .min(8),
});
 
export const registerYupSchema = yup.object({
  first_name: yup.string().trim().required("First name is required!"),

  last_name: yup.string().trim().required("Last name is required!"),

  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required!")
    .trim(),

  password: yup
    .string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters long."),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required!")
    .oneOf([yup.ref("password"), null], "Passwords must match."),

  phone: yup.string().required("Phone number is required!"),
  raa : yup.bool().required()
});
