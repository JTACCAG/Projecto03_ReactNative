import * as Yup from 'yup';
import {TransactionType} from '../enums/transaction-type';

export interface TransactionFormValues {
  from?: string;
  amount: number;
  type: TransactionType;
  tags: string[];
  description: string;
}

export const transactionValidation = Yup.object().shape({
  amount: Yup.number()
    .required('El monto es obligatorio')
    .positive('El valor debe ser un número positivo')
    .test(
      'is-positive',
      'El valor debe ser mayor que cero',
      value => value > 0,
    ),
  type: Yup.string()
    .oneOf(Object.values(TransactionType), 'Tipo de transacción no válido')
    .required('Tipo de transacción es obligatorio'),
  tags: Yup.array()
    .of(Yup.string().required('Cada etiqueta es requerida'))
    .required('El campo de etiquetas es requerido')
    .min(1, 'Debe haber al menos una etiqueta'),
  description: Yup.string().required('La descripción es obligatoria'),
  from: Yup.string().when('type', {
    is: (value: TransactionType) => value === TransactionType.TRANSACTION,
    then: schema => schema.required('El remitente es requerido'),
    otherwise: schema => schema.notRequired(),
  }),
});
