import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdListScreen = () => {
  const navigation = useNavigation();
  const buttonTitles = ['320 x 50', '320 x 100', '300 x 50', '300 x 250', '728 x 90', '468 x 60', '200 x200', '250 x 250'];
  const adUnitIds = ['DOC-740-1', 'DOC-739-1', 'DOC-738-1', 'DOC-737-1', 'DOC-1008-1', 'DOC-1007-1', 'DOC-164-1', 'DOC-163-1'];

  return (
    <View style={styles.container}>
      {buttonTitles.map((title, index) => {
        const adUnit = adUnitIds[index];
        return (
          <TouchableOpacity
            key={title}
            style={styles.button}
            onPress={() => navigation.navigate('SingleAdScreen', { adSize: title, adUnit })}
          >
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AdListScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    width: 300,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
