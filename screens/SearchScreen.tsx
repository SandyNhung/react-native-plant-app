import React, { useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { plantApiToken } from '../config';

// import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import {
  TextInput,
  Text,
  Button,
  Appbar,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';

export default function TabOneScreen() {
  const [text, setText] = useState('');
  const [plants, setPlants] = useState([]);
  const [err, setErr] = useState(null);
  const [selectedImages, setSelectedImages] = useState<Array<number>>([]);

  const onPressSearch = async () => {
    await fetch(
      `https://trefle.io/api/v1/plants/search?token=${plantApiToken.token}&q=${text}`
    )
      .then((res: any) => res.json())
      .then((resp) => {
        setPlants(resp.data ? resp.data : []);
      })
      .catch((err) => setErr(err.message));
  };

  const onPressImage = (id: number) => {
    console.log('id', selectedImages, 'hello', id);
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };
  const renderItem = ({ item }: any) => {
    return (
      <Card
        style={selectedImages.includes(item.id) ? styles.imageSelected : {}}
      >
        <TouchableOpacity onPress={() => onPressImage(item.id)}>
          <Card.Cover source={{ uri: item.image_url }} />
        </TouchableOpacity>
        <Card.Content>
          <View style={{ flexDirection: 'row' }}>
            <Title style={{ flexWrap: 'wrap', flex: 1 }}>
              {item.common_name}
            </Title>
          </View>
          <Paragraph>{item.scientific_name}</Paragraph>
        </Card.Content>
      </Card>
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
        extraData={selectedImages}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  imageSelected: {
    borderWidth: 6,
    borderColor: 'white',
    opacity: 0.5,
  },
});
