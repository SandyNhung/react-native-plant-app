import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Image } from 'react-native';
import { plantApiToken } from '../config';

// import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { TextInput, Text, Button, Appbar } from 'react-native-paper';

export default function TabOneScreen() {
  const [text, setText] = useState('');
  const [plants, setPlants] = useState([]);
  const [err, setErr] = useState(null);
  const onPressSearch = async () => {
    await fetch(
      `https://trefle.io/api/v1/plants/search?token=${plantApiToken.token}&q=${text}`
    )
      .then((res: any) => res.json())
      .then((resp) => {
        console.log('res', resp.data);
        setPlants(resp.data ? resp.data : []);
      })
      .catch((err) => setErr(err.message));
  };
  const renderItem = ({ item }: any) => {
    console.log('image_url', item.image_url);
    return (
      <Image
        source={{ uri: item.image_url }}
        resizeMode="cover"
        style={styles.image}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction />
        <TextInput
          label="plant name..."
          value={text}
          onChangeText={(text) => setText(text)}
          mode="flat"
        />
        <Appbar.Action icon="magnify" onPress={onPressSearch} />
      </Appbar.Header>

      <FlatList
        numColumns={2}
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
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
  image: {
    flex: 1,
    width: 100,
    height: 100,
    margin: 10,
  },
});
