import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, Linking } from 'react-native';


function AdImage({adResponse, containerStyle}) {
    const ref = useRef(null);
    return (
        <TouchableOpacity onPress={() => Linking.openURL(adResponse?.adViewedURL)} ref={ref}>
            <Image
                source={{ uri: adResponse?.imagePath }}
                style={containerStyle}
            />
            <Text>{adResponse?.data?.response[0]?.adText}</Text>
        </TouchableOpacity>
    );
}

export default AdImage;