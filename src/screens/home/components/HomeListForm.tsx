import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ITransaction} from '../../../models/interfaces/transaction';
import {getTransactions} from '../../../services/api/transactionService';
import {Card, Icon, Text} from 'react-native-paper';
import {TransactionType} from '../../../models/enums/transaction-type';

const iconType: Record<TransactionType, React.JSX.Element> = {
  [TransactionType.INCOME]: (
    <Icon source="arrow-top-right" size={30} color="#4caf50" />
  ),
  [TransactionType.WITHDRAWAL]: (
    <Icon source="arrow-bottom-left" size={30} color="#f44336" />
  ),
  [TransactionType.TRANSACTION]: (
    <Icon source="swap-horizontal" size={30} color="#2196f3" />
  ),
};

const HomeListForm = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  useEffect(() => {
    const listTransactions = async () => {
      const response = await getTransactions();
      if (response.success) {
        console.log(response.data);
        setTransactions(response.data);
      }
    };
    listTransactions();
  }, []);
  return (
    <FlatList
      data={transactions}
      keyExtractor={tr => tr._id}
      renderItem={({item}) => (
        <View style={styles.cardItem}>
          <Card>
            <Card.Content style={styles.cardContent}>
              {iconType[item.type]}
              <Text variant="titleMedium">S/.{item.amount}</Text>
            </Card.Content>
          </Card>
        </View>
      )}
    />
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
    marginTop: 15,
  },
  item: {
    padding: 5,
  },
});

export default HomeListForm;
