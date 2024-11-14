import * as Yup from "yup";

export const projectSchema = Yup.object().shape({
  companyName: Yup.string().required("Fullname required"),
  budget: Yup.number().required("budget required"),
  status: Yup.string().required("status required"),
  completionRate: Yup.number()
    .min(0)
    .max(100)
    .required("completion rate required"),
  logo: Yup.string(),
});

export type Project = Yup.InferType<typeof projectSchema>;
