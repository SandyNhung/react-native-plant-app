import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import Colors from '../constants/Colors';
import { Text } from './Themed';
import { PlantInitial } from '../constants/Type';

const PlantList = ({ url }: { url: string }) => {
  return <Image style={styles.imagePlant} source={{ uri: url }} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imagePlant: {
    width: 100,
    height: 100,
  },
});

export default PlantList;
