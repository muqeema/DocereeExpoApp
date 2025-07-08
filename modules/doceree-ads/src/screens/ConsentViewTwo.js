
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../utils/Colors.js'
import Strings from '../utils/Strings.js'
import mediumRectangle from '../utils/Helpers.js'
import getAdTypeBySize from '../utils/AdTypeBySize.js'
import {Constants} from '../utils/constants.js'
import ConsentViewThree from './ConsentViewThree.js'
import ThanksPage from './ThanksPage.js'
import { BlockLevel, getBlockLevelInfo } from '../constant/enums';


const ConsentViewTwo = ({ onCallback, adResponse=null}) => {
    adWidth = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[0]) : 0)
    adHeight = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[1]) : 0)

    isMediumRectangle = mediumRectangle(adResponse.adSize);
    buttonWidth = isMediumRectangle ? (adWidth * 0.9) : (adWidth * 0.31);
    buttonHeight = isMediumRectangle ? adHeight * 0.25 : adHeight * 0.90;

    isBanner = getAdTypeBySize(adResponse.adSize) == Constants.AdType.isBanner
    isSmallBanner = getAdTypeBySize(adResponse.adSize) == Constants.AdType.smallBanner

    const [clickedForNext, setClickedForNext] = useState(false);
    const [clickedForThakns, setClickedForThakns] = useState(false);
    const [blockLevel, setBlockLevel] = useState(null);
    const styles = styling(adResponse);

    function onClickedForNext() {
        setClickedForNext(true)
        console.log("element.id : ",isMediumRectangle)
    }

    function onClickedForThanks(consentLabel) {
        setBlockLevel(getBlockLevelInfo(consentLabel).blockLevelCode);
        setClickedForThakns(true)
    }
    
    // Callback function to update value in ParentComponent
    function handleCallback(showConsent, isRefresh) {
        onCallback(false, isRefresh);
    };

    if(clickedForNext) {
        return (
            <ConsentViewThree onCallback={handleCallback} adResponse={adResponse}/>
        )
    } else if(clickedForThakns) {
        return (
            <ThanksPage onCallback={handleCallback} adResponse={adResponse} adBlockLevel={blockLevel}/>
        )
    } else {
     return (
        <View style={[styles.container]}>
            <View style={[styles.buttonRow]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => onClickedForThanks(BlockLevel.AdCoveringContent)}>
                        <Text style={[styles.headline]}> {Strings.StringsConsent2.coveringAd}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={() => onClickedForThanks(BlockLevel.AdWasInappropriate)}>
                        <Text style={[styles.headline]}>{Strings.StringsConsent2.inappropriateAd}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={() => onClickedForNext()}>
                        <Text style={[styles.headline]}>{Strings.StringsConsent2.notInterestedAd}</Text>
                    </TouchableOpacity>
            </View>
        </View>
        )
    }
}

export default ConsentViewTwo

export const styling = (adResponse) =>
    StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.grey1BackgroundColor,
        width: adWidth,
        height: adHeight,
    },
        headline: {
            textAlign: 'center', // <-- the magic
            alignSelf: 'center',
            fontSize: (self.isBanner || self.isSmallBanner) ? Constants.FontSize.textFontSize10 : Constants.FontSize.textFontSize12,
        },
    button: {
        justifyContent: "center",
        alignItems: 'center',
        color: Colors.black,
        backgroundColor: Colors.white1Color,
        width: buttonWidth,
        height: buttonHeight,
    },
    buttonRow:  {
        flex: 1,
        gap: 5,
        flexDirection: isMediumRectangle ? 'column' : 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
});
