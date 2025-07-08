import React, { useRef } from 'react';
import {StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Animated} from 'react-native';
import Colors from '../utils/Colors.js'
import ImageAssets from '../assets/ImageAssets.js';

function AdIcons({onClick}) {
    const animatedWidth = useRef(new Animated.Value(0)).current;
    function animatedBox() {
        console.log("Clicked")
        Animated.timing(
            animatedWidth, {
                toValue: 90,
                duration: 1000,
                useNativeDriver: false
            }).start(({ finished }) => {
                if (finished) {
                    onClick()
                    console.log('Animation finished');
                    // Start the second animation to width 0
                    Animated.timing(
                        animatedWidth, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: false
                        }
                    ).start(() => {
                        console.log('Reset animation finished');
                    });
                }
            }
        );
    }
    const ref = useRef(null);
    const animatedStyle = { width: animatedWidth, height: 18 }
    return (
        <View style={[styles.overlay]}>
            <TouchableOpacity style = {styles.labelContainer} onPress = {animatedBox}>
                <Animated.View style = {[animatedStyle]}>
                    <Text style = {styles.text}>Ads by doceree</Text>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={animatedBox} ref={ref} style={ styles.iconBg}>
                <Image source={ImageAssets.icInfo} style={ styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClick()} ref={ref} style={ styles.iconBg}>
                <Image source={ImageAssets.icXmark} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default AdIcons;

const styles =  StyleSheet.create({
    overlay: {
          flex: 1,
          position: 'absolute',
          flexDirection: 'row',
          gap: 3,
          right: 0,
          height: 18,
    },
    labelContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBg: {
        height: 18, 
        width: 18,
        alignItems: 'center',
        backgroundColor: Colors.white1Color,
    },
    icon: {
        height: 15, 
        width: 15,
        marginTop: 1.5,
        tintColor: Colors.purpleColor,
    },
    text: {
        height: 18,
        textAlign: 'center', // <-- the magic
        fontSize: 12,
        color: Colors.purpleColor,
        backgroundColor: Colors.white1Color,
    }
});