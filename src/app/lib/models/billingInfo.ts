import * as Yup from "yup";

export const billingInfoSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname required"),
  companyName: Yup.string().required("Company name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  vatNumber: Yup.string().required("VAT number needed"),
});

export type BillingInfo = Yup.InferType<typeof billingInfoSchema>;
