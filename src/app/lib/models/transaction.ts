import * as Yup from "yup";

export const transactionSchema = Yup.object().shape({
  date: Yup.date().required(),
  companyName: Yup.string().required("code name required"),
  value: Yup.number().required("value required"),
  status: Yup.string().required("status required"),
});

export type Transaction = Yup.InferType<typeof transactionSchema>;
