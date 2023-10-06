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
export const validateProfile = yup.object({
  username: yup.string().min(6, 'Minimal 6 karakter').required("Anda Harus Memasukkan Username"),
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
  fullname: yup
    .string()
    .required('Anda Harus Memasukkan Nama Lengkap'),
  nik: yup
    .string()
    .required('Anda Harus Memasukkan NIK')
});

export const validateGooverment = yup.object({
  name: yup.string().required("Anda Harus Memasukkan Nama Goverment"),
  address: yup
    .string()
    .required('Anda Harus Memasukkan Alamat Lengkap'),
  type: yup
    .string()
    .required('Anda Harus Memasukkan Type')
});

export const validateRegister = yup.object({
  username: yup.string().min(6, 'Minimal 6 karakter').required("Anda Harus Memasukkan Username"),
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
  password: yup.string().min(8, 'Password Minimal 8 Karakter').required("Anda Harus Memasukkan Password"),
  nik: yup.string().min(16, 'Mnimal 16 angka').required("Anda Harus Memasukkan NIK"),
});

export const validateVehicle = yup.object({
  
});
