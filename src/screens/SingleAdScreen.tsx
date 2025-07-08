import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { DocereeAdView } from 'react-native-doceree-ads';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation'; // adjust path if needed

type Props = {
  route: RouteProp<RootStackParamList, 'SingleAdScreen'>;
};

const SingleAdScreen: React.FC<Props> = ({ route }) => {
  const parentRef = useRef(null);
  const { adSize, adUnit } = route.params;

  const handleAdSuccess = (message: string) => {
    console.log("Ad Success:", message);
  };

  const handleAdFailure = (message: string) => {
    console.log("Ad Failure:", message);
  };

  return (
    <View ref={parentRef} collapsable={false} style={styles.container}>
      <DocereeAdView
        parentRef={parentRef}
        adSize={adSize}
        adSlot={adUnit}
        success={handleAdSuccess}
        failure={handleAdFailure}
      />
    </View>
  );
};

export default SingleAdScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
});
