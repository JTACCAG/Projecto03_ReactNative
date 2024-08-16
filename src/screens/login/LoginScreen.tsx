import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoginForm from './components/LoginForm';

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default LoginScreen;
