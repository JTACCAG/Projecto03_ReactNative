import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../../nagivation/context/AuthContext';
import {setupAxiosInterceptors} from '../../services/api/apiClient';
import HomeHeaderForm from './components/HomeHeaderForm';
import HomeListForm from './components/HomeListForm';

const HomeScreen = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext) {
      setupAxiosInterceptors(authContext);
    }
  }, [authContext]);

  return (
    <View style={styles.container}>
      <HomeHeaderForm />
      <HomeListForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardItem: {
    flexDirection: 'row',
  },
  item: {
    padding: 5,
  },
});

export default HomeScreen;
