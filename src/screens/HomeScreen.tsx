import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { getAdvertisingInfo } from 'react-native-advertising-info';
import { JSHash, CONSTANTS } from 'react-native-hash';
import { HcpBuilder } from 'react-native-doceree-ads';

const HomeScreen = () => {

  useEffect(() => {
    requestPermission();
    initializeHcp();
  }, []);

  const requestPermission = async () => {
    try {
      const status = await requestTrackingPermission();
      if (status === 'authorized') {
        console.log('Tracking permission granted');
      } else {
        console.log('Tracking permission denied');
      }
      getAdvertisingId();
    } catch (error) {
      console.error('Error requesting tracking permission:', error);
    }
  };

  const getAdvertisingId = async () => {
    try {
      const adInfo = await getAdvertisingInfo();
      console.log('Advertising Info:', adInfo);
    } catch (error) {
      console.error('Error retrieving Advertising ID:', error);
    }
  };

  const initializeHcp = () => {
    const promiseHcpId = JSHash("5432112", CONSTANTS.HashAlgorithms.sha256);
    const promiseHcpEmail = JSHash("doceree@yopmail.com", CONSTANTS.HashAlgorithms.sha256);

    Promise.all([promiseHcpId, promiseHcpEmail]).then((values) => {
      const hcpBuilder = new HcpBuilder();
      hcpBuilder.setHcpId("54321");
      hcpBuilder.setHashedHcpId(values[0]);
      hcpBuilder.setFirstName("John");
      hcpBuilder.setLastName("Doe");
      hcpBuilder.setEmail("doceree@yopmail.com");
      hcpBuilder.setSpecialization("Anesthesiology");
      hcpBuilder.setOrganisation("XYZ-organisation");
      hcpBuilder.setCity("New Delhi");
      hcpBuilder.setState("Delhi");
      hcpBuilder.setCountry("INDIA");
      hcpBuilder.setZipCode("110024");
      hcpBuilder.setGender("Male");
      hcpBuilder.setHashedEmail(values[1]);
      hcpBuilder.build();
    });
  };

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Image
        style={{ width: '100%', height: '50%' }}
        source={{ uri: "https://d3gglspuvl1a31.cloudfront.net/237/147/creatives6/103993905.JPEG" }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: 300,
    height: 250,
  },
});
