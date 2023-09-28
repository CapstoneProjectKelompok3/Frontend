import * as yup from "yup";

export const validateLogin = yup.object({
  email: yup
    .string()
    .required('Anda Harus Memasukkan Email')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      'Emails must contain symbols @'
    ),
    password: yup.string().required('Anda Harus Memasukkan Password'),
});