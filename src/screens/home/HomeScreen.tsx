import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../../nagivation/context/AuthContext';
import {setupAxiosInterceptors} from '../../services/api/apiClient';
import HomeHeaderForm from './components/HomeHeaderForm';
import HomeListForm from './components/HomeListForm';
import {FAB} from 'react-native-paper';
import HomeDialogForm from './components/HomeDialogForm';

const HomeScreen = () => {
  const authContext = useContext(AuthContext);

  const [visible, setVisible] = useState<boolean>(false);
  const showDialog = () => setVisible(true);

  useEffect(() => {
    if (authContext) {
      setupAxiosInterceptors(authContext);
    }
  }, [authContext]);

  return (
    <View style={styles.container}>
      <HomeHeaderForm />
      <HomeListForm />
      <FAB icon="plus" style={styles.fab} onPress={showDialog} />
      <HomeDialogForm visible={visible} setVisible={setVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    height: '100%',
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
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 5,
  },
});

export default HomeScreen;
