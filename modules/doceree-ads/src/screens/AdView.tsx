import React, { useState, useRef } from 'react';
import {StyleSheet, View} from 'react-native';
import ConsentViewOne from './ConsentViewOne.js';
import Colors from '../utils/Colors.js'
import AdIcons from '../components/AdIcons';
import AdScript from '../components/AdScript';
import AdImage from '../components/AdImage';

function AdView({ renderAfterThanks, adResponse, scriptData, adStatus }) {

  const [consentStatus, setConsentStatus] = useState(false);

  // Callback function to update value in ParentComponent
  const handleCallback = (showConsent, isRefresh) => {

    console.log('handleCallback1', isRefresh);
    if (isRefresh) {
      renderAfterThanks();
    }
    setConsentStatus(showConsent);
  }

  const onClickedIcon = () => {
      setConsentStatus(true)
  }
  
  function createView() {
    return (
        <View style={styles.container}>
            { adResponse?.imagePath ? 
                <AdImage adResponse={adResponse} containerStyle={styles.container}/> :
                scriptData && < AdScript containerStyle={styles.container} script={scriptData}/>
            }
            <AdIcons onClick={onClickedIcon}/>
        </View>
    )
  }

  const styles = styling(adResponse);
  const ref = useRef(null);

  if(adStatus !== -1) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {createView()}
            {consentStatus && (
                <View style={styles.container} ref={ref}>
                    <ConsentViewOne onCallback={handleCallback} adResponse={adResponse}/>
                </View>
            )}
        </View>
    );
  } else {
    return(
      <View style={{backgroundColor: 'white' }}
      collapsable={false}
      ref={(component) => {this.viewRef = component;}}>

      </View>
    );
  }
}


function styling(adResponse) {
    return StyleSheet.create({
        container: {
            backgroundColor: Colors.grey1BackgroundColor,
            position: 'absolute',
            width: parseInt(typeof adResponse?.adSize !== 'undefined' ? adResponse.adSize.split('x')[0] : 320),
            height: parseInt(typeof adResponse?.adSize !== 'undefined' ?adResponse.adSize.split('x')[1]: 50),
        },
        text: {
            textAlign: 'center', // <-- the magic
            fontSize: 12,
            color: Colors.purpleColor,
        }
    });
}

export default AdView;
