import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

export const authorSchema = Yup.object().shape({
  fullName: Yup.string().required("Fullname required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  function1: Yup.string().required("function1 required"),
  function2: Yup.string().required("function1 required"),
  status: Yup.string().required("status required"),
  employedDate: Yup.date().required("employeddate required"),
  avatar: Yup.mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (value && value instanceof FileList && value[0]) {
        return value[0].size <= 2000000;
      }
      return true;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      if (value && value instanceof FileList && value[0]) {
        return SUPPORTED_FORMATS.includes(value[0].type);
      }
      return true;
    }),
});

export type Author = Yup.InferType<typeof authorSchema>;
