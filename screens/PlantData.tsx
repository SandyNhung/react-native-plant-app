import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import variable from '../constants/Variables';

export default function PlantData() {
  const { plantInitial } = variable;
  const [plant, setPlant] = React.useState<any>(plantInitial);

  const inputList = () => {
    return Object.keys(plantInitial).map((p, index) => (
      <TextInput
        key={index}
        label={p}
        value={plant[p]}
        onChangeText={(text) => setPlant({ ...plant, [p]: text })}
      />
    ));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant</Text>
      {inputList}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
