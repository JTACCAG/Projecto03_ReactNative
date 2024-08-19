import React, {useState} from 'react';
import {StyleSheet, View, TextInput as NativeTextInput} from 'react-native';
import {Chip, TextInput} from 'react-native-paper';
import {Noop} from 'react-hook-form';
import {RenderProps} from 'react-native-paper/lib/typescript/components/TextInput/types';

type ChipInputType<T> = {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: T;
};

const ChipInput = ({onChange, onBlur, value}: ChipInputType<string[]>) => {
  const [text, setText] = useState<string>('');

  const handleAddChip = () => {
    if (text.trim() && !value.includes(text.trim())) {
      onChange([...value, text.trim()]);
      setText('');
      onBlur();
    }
  };

  const onchange = (data: string) => {
    let texts = data.split(/[,\n]+/);
    const textCurrent = texts.pop() ?? '';
    texts = texts.map(v => v?.trim()).filter(v => v);
    onChange([...(value ?? []), ...texts]);
    setText(textCurrent);
  };

  const onblur = () => {
    handleAddChip();
  };

  const handleDeleteChip = (index: number) => {
    const newChips = [...value];
    newChips.splice(index, 1);
    onChange(newChips);
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Etiquetas"
        value={text}
        multiline
        onChangeText={onchange}
        onSubmitEditing={handleAddChip}
        returnKeyType="done"
        onBlur={onblur}
        render={(props: RenderProps) => (
          <View style={styles.container}>
            <NativeTextInput {...props} style={styles.nativeInput} />
            <View style={styles.chipContainer}>
              {value?.map((chip, index) => (
                <Chip
                  key={index}
                  onClose={() => handleDeleteChip(index)}
                  style={styles.chip}>
                  {chip}
                </Chip>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  nativeInput: {
    padding: 0,
  },
});

export default ChipInput;
