import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Menu, Text} from 'react-native-paper';
import {TransactionType} from '../../../../models/enums/transaction-type';
import {Noop} from 'react-hook-form';

type SelectInputType<T> = {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: T;
  options: T[];
};

const SelectInput = ({
  onChange,
  onBlur,
  value,
  options,
}: SelectInputType<TransactionType>) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value || 'Select an option',
  );

  const openMenu = () => setVisible(true);
  const closeMenu = () => {
    setVisible(false);
    onBlur();
  };

  const handleSelect = (option: TransactionType) => {
    setSelectedOption(option);
    setVisible(false);
    onChange(option);
  };

  return (
    <View>
      <Button onPress={openMenu} mode="contained">
        {selectedOption}
      </Button>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View>
            <Text style={styles.none}>{''}</Text>
          </View>
        }>
        {options.map(option => (
          <Menu.Item
            key={option}
            onPress={() => handleSelect(option)}
            title={option}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  none: {
    height: 1,
  },
});

export default SelectInput;
