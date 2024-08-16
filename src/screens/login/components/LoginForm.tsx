import React, {useContext, useState} from 'react';
import {View, Alert} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {
  LoginFormValues,
  loginValidation,
} from '../../../models/yup/LoginValidation';
import {authSignIn} from '../../../services/api/authService';
import {AuthContext} from '../../../nagivation/context/AuthContext';

const LoginForm = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidation),
  });

  const submitForm = async (data: LoginFormValues) => {
    setLoading(true);
    if (!loading) {
      const response = await authSignIn(data.email, data.password);
      setLoading(false);
      if (response.success) {
        // await login(response.data);
        console.log('aca');
        await auth.login(response.data);
      } else {
        Alert.alert('Error', response.message ?? '');
      }
    }
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            label="Correo electrónico"
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email ? true : false}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={errors.email ? true : false}>
        {errors.email?.message}
      </HelperText>
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            label="Contraseña"
            secureTextEntry={true}
            onChangeText={onChange}
            error={errors.password ? true : false}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={errors.password ? true : false}>
        {errors.password?.message}
      </HelperText>
      <Button
        loading={loading}
        disabled={loading}
        mode="contained"
        onPress={handleSubmit(submitForm)}>
        Iniciar Sesión
      </Button>
    </View>
  );
};

export default LoginForm;
