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
  username: yup.string().min(6, 'Minimal 6 karakter'),
  // email: yup
  //   .string()
  //   .required("Anda Harus Memasukkan Email")
  //   .matches(
  //     /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
  //     "Emails harus menggunakan @"
  //   ),
  fullname: yup
    .string()
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

export const validateRegisterOffice = yup.object({
  fullname: yup.string().min(6, 'Minimal 6 karakter').required("Anda Harus Memasukkan Fullname"),
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
  password: yup.string().min(8, 'Password Minimal 8 Karakter').required("Anda Harus Memasukkan Password"),
  vehicle: yup.string().required("Anda Harus Memilih Kendaraan"),
});

export const validateVehicle = yup.object({
  
});

export const validateForgot = yup.object({
  email: yup.string().required("Anda Harus Memasukkan Email")
})
export const validateReset = yup.object({
  currentPass: yup.string().required("Anda Harus Memasukkan Password Sekarang"),
  newPass: yup.string()
    .required("Anda Harus Memasukkan Password Baru")
    .min(8, "Password baru harus minimal 8 karakter")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password baru harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka, dan satu karakter khusus (@$!%*?&)"
    ),
  repeatPass: yup.string()
    .required("Ulangi Password Baru")
    .min(8, "Password baru harus minimal 8 karakter")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password baru harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka, dan satu karakter khusus (@$!%*?&)"
    ),
});
