import * as yup from "yup";

export const validateLogin = yup.object({
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
  password: yup.string().required("Anda Harus Memasukkan Password"),
});

export const validateRegister = yup.object({
  username: yup.string().min(6, 'Minimal 6 karakter').required("Anda Haris Memasukkan Username"),
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
    password: yup.string().min(5, 'Password Minimal 5 Karakter').required("Anda Harus Memasukkan Password"),
    nik: yup.string().min(16, 'Mnimal 16 angka').required("Anda Harus Memasukkan NIK"),
});
