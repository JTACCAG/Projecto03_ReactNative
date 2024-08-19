import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from 'react-native-paper';
import {
  TransactionFormValues,
  transactionValidation,
} from '../../../models/yup/TransactionValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {TransactionType} from '../../../models/enums/transaction-type';
import SelectInput from './inputs/SelectInput';
import ChipInput from './inputs/ChipInput';
import { Picker } from '@react-native-picker/picker';

type HomeDialog = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const HomeDialogForm = ({visible, setVisible}: HomeDialog) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TransactionFormValues>({
    resolver: yupResolver(transactionValidation),
  });

  const hideDialog = (response = false) => {
    if (response) {
      console.log(response);
    }
    setVisible(false);
  };

  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Nuevo</Dialog.Title>
        <Dialog.Content>
          <Controller
            control={control}
            name="type"
            render={({field: {onChange, onBlur, value}}) => (
              <SelectInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={Object.values(TransactionType) as TransactionType[]}
              />
            )}
          />
          <HelperText type="error" visible={!!errors.type}>
            {errors.type?.message}
          </HelperText>
          <Controller
            control={control}
            name="amount"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                label="Monto"
                // maxLength={21}
                onChangeText={text => {
                  text = text
                    .replace(/^0+(?!\.)/, '')
                    .replace(/[^\d.]/g, '')
                    .replace(/(\.\d{0,2})\d*$/g, '$1');
                  onChange(text ? text : '');
                }}
                onBlur={onBlur}
                error={!!errors.amount}
                value={value?.toString() ?? null}
                keyboardType="decimal-pad"
                inputMode="decimal"
              />
            )}
          />
          <HelperText type="error" visible={!!errors.amount}>
            {errors.amount?.message}
          </HelperText>
          <Controller
            control={control}
            name="description"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                label="Descripción"
                onChangeText={onChange}
                error={!!errors.description}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <HelperText type="error" visible={!!errors.description}>
            {errors.description?.message}
          </HelperText>
          <Controller
            control={control}
            name="tags"
            render={({field: {onChange, onBlur, value}}) => (
              <ChipInput onChange={onChange} onBlur={onBlur} value={value} />
            )}
          />
          <HelperText type="error" visible={!!errors.tags}>
            {errors.tags?.message}
          </HelperText>

          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog(false)}>Cancelar</Button>
          <Button onPress={handleSubmit(() => hideDialog(true))}>Crear</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default HomeDialogForm;
