import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ITransaction} from '../../../models/interfaces/transaction';
import {getTransactions} from '../../../services/api/transactionService';
import {Card, Icon, Text} from 'react-native-paper';
import {TransactionType} from '../../../models/enums/transaction-type';

const iconType: Record<TransactionType, React.JSX.Element> = {
  [TransactionType.INCOME]: (
    <Icon source="arrow-top-right" size={60} color="#4caf50" />
  ),
  [TransactionType.WITHDRAWAL]: (
    <Icon source="arrow-bottom-left" size={60} color="#f44336" />
  ),
  [TransactionType.TRANSACTION]: (
    <Icon source="swap-horizontal" size={60} color="#2196f3" />
  ),
};

const HomeListForm = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  useEffect(() => {
    const listTransactions = async () => {
      const response = await getTransactions();
      if (response.success) {
        setTransactions(response.data);
      } else {
        await listTransactions();
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
          <Card style={styles[item.type]}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.transItem}>
                <View style={styles.divItem}>
                  <View>{iconType[item.type]}</View>
                  <View>
                    <Text variant="titleMedium">{item.description}</Text>
                    <View style={styles.divItem}>
                      {item.tags.map((v, i) => (
                        <View key={i}>
                          <Text>#{v} </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                <View>
                  <Text variant="titleMedium">S/.{item.amount}</Text>
                </View>
              </View>
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
  transItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardItem: {
    marginTop: 15,
  },
  item: {
    padding: 5,
  },
  income: {
    backgroundColor: '#dcedc8',
  },
  withdrawal: {
    backgroundColor: '#ffcdd2',
  },
  transaction: {
    backgroundColor: '#bbdefb',
  },
});

export default HomeListForm;
