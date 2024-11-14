import * as Yup from "yup";

export const loginYupSchema = Yup.object().shape({
  password: Yup.string().required("Password Required"),
  email: Yup.string().email("Invalid email").required("Email required"),
});

export const todoYupSchema = Yup.object().shape({
  text: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  tags: Yup.array(Yup.number().min(1).max(6).required()).required(),
});
