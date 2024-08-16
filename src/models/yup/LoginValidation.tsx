import * as Yup from 'yup';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    // .matches(
    //   /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    //   'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo especial',
    // )
    .required('La contraseña es obligatoria'),
});
