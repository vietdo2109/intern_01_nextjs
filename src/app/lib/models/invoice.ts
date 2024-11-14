import * as Yup from "yup";

export const invoiceSchema = Yup.object().shape({
  date: Yup.date().required(),
  code: Yup.string().required("code name required"),
  value: Yup.number().required("value required"),
});

export type Invoice = Yup.InferType<typeof invoiceSchema>;
