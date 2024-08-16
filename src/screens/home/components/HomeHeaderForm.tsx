import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Icon, Text} from 'react-native-paper';
import {IWallet} from '../../../models/interfaces/wallet';
import {walletByUser} from '../../../services/api/walletService';

const HomeHeaderForm = () => {
  const [wallet, setWallet] = useState<IWallet>({
    income: 0,
    expense: 0,
    balance: 0,
  });

  useEffect(() => {
    const getWallet = async () => {
      const response = await walletByUser();
      if (response.success) {
        setWallet(response.data);
      }
    };
    getWallet();
  }, []);

  return (
    <View>
      <Card>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge">Saldo total</Text>
          <Text variant="titleLarge">S/.{wallet.balance}</Text>
          <View style={styles.cardItem}>
            <View style={styles.item}>
              <View style={styles.cardItem}>
                <View>
                  <Icon
                    source="arrow-up-bold-circle-outline"
                    size={60}
                    color="#008000"
                  />
                </View>
                <View>
                  <Text variant="titleLarge">Ingresos</Text>
                  <Text variant="titleLarge" ellipsizeMode="tail">
                    +S/.{wallet.income}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.cardItem}>
                <View>
                  <Icon
                    source="arrow-down-bold-circle-outline"
                    size={60}
                    color="#FF0000"
                  />
                </View>
                <View>
                  <Text variant="titleLarge">Gastos</Text>
                  <Text variant="titleLarge" ellipsizeMode="tail">
                    -S/.{wallet.expense}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
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

export default HomeHeaderForm;
