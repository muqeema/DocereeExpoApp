import React, {Component, RefObject} from 'react';
import { AppState, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../constant/strings';

import {getAdvertisement, callImpressionUrl, callViewability} from '../api/Network';
import AdView from './AdView';
import {getIsTablet} from '../utils/AppInfo.js';
import checkViewVisibility from '../components/Viewability';

// Define the interface for your props
interface MyComponentProps {  
  parentRef: RefObject<any>;
  // Add other props here if needed
}

// Define the interface for your state
interface MyComponentState {
  hcp: any; // Adjust the type as needed
  adResponse: any; // Adjust the type as needed
  adSuccess: number;
}

export class DocereeAdView extends Component<MyComponentProps, MyComponentState> {
  private viewRef: RefObject<any>;
  visibilityInterval: NodeJS.Timeout;
  customtimer: NodeJS.Timeout;
  private OneSecMrcSent = false
  private totalViewTime = 0
  private savedViewPercentage = 0
  private timerCounter = 0;
  private viewportPercentage = 90
  appState: string;

  constructor (props: MyComponentProps) {
    super(props);
    this.viewRef = React.createRef();
    this.state = {
      hcp: null,
      adResponse: null,
      adSuccess: -1,
    };
    this.appState = AppState.currentState;
   }

   subscription = null;
   async componentDidMount() {
     this.requestForAd()
     this.subscription =  AppState.addEventListener('change', this._handleAppStateChange);
   }
 
   componentDidUpdate(prevProps, prevState) {
     // console.log('componentDidUpdate View Created');
   }
 
   componentWillUnmount(){
     clearInterval(this.visibilityInterval);
     clearInterval(this.customtimer);
     if(this.timerCounter > 2 && this.timerCounter < 30){
      this.sendViewTime('mrc')
     }
 
     console.log('componentWillUnmount: Ad View Removed');
     this.subscription.remove();
   }
 
   _handleAppStateChange = (nextAppState) => {
      if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        this.startTimer(this.props.success);
      } else if (nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background!');
        if(this.timerCounter > 2 && this.timerCounter < 30){
          this.sendViewTime('mrc')
        }
        if (this.customtimer) {
          clearInterval(this.customtimer);
        }
      }
      this.appState = nextAppState;
    };

  updateAdResponse(value){
    try {
      if(JSON.parse(value).response[0].status != -1) {
        var data = JSON.parse(value).response[0];
        // console.log('Ad Response : ', data);
        this.setState({
          adSuccess: data.status
        });
        this.setState({
          adResponse: data
        });

        if(this.props.success)
          this.props.success("Success");


        this.startTimer(this.props.success);
      }else{
        if(this.props.failure)
          this.props.failure("Fail");


      this.startTimer(this.props.success);
      }
    } catch (error) {
      console.error(error);
    }
  }

  requestForAd() {
    console.log('requestForAd')
    AsyncStorage.getItem(strings.CONSTANT.HcpData).then(asyncStorageRes => {
      var hcp = JSON.parse(asyncStorageRes);
      this.setState({hcp: hcp});
      console.log('componentDidMount View Created', this.props);
      this.adLoad();
    });
  }

  adLoad() {
    console.log("this.props.adSize : ", this.props.adSize);
    console.log("this.props.adSize : ", this.props.adSize === '728 x 90');
    if(this.props.adSize === "728 x 90" || this.props.adSize === "468 x 60"){
      console.log("Is Table : ", getIsTablet());
      if(!getIsTablet()){
        return;
      }
    }

    console.log('before setting status: ', this.state.adSuccess);
    this.timerCounter = 0
    this.totalViewTime = 0
    this.savedViewPercentage = 0
    this.OneSecMrcSent = false
    this.setState ({
      adResponse: null,
      adSuccess: -1,
    })
    console.log('after setting status: ', this.state.adSuccess);
    // Adding a small delay before measuring
    setTimeout(async () => {
      try {
        const visiblePercentage = await this.updateVisibilityPercentage();
        console.log('viewa visiblePercentage: ', visiblePercentage);
        if (visiblePercentage > this.viewportPercentage) {
          (async () =>{
            const jsonData = await getAdvertisement(this.state.hcp, this.props.adSlot);
            console.log('Response Status :', JSON.parse(jsonData).response[0].status);
            console.log('Response :', JSON.parse(jsonData).response[0]);
            this.updateAdResponse(jsonData);
            this.callImpression();
          })()
        } else {
          this.visibilityInterval = setInterval(this.viewportTimer, 1000); // Check every second
        }
      } catch (error) {
        console.error('Error in measuring visibility:', error);
      }
    }, 500); // Adjust the delay time as necessary
  }
  
  updateVisibilityPercentage = async (): Promise<number> => {
    try {
      const visiblePercentage = await checkViewVisibility({
        viewRef: this.viewRef,
        parentRef: this.props.parentRef,
      });
      return visiblePercentage;
    } catch (error) {
      console.error('Error in updateVisibilityPercentage:', error);
      return 0.0;
    }
  }

  viewportTimer = async () => {
    const visiblePercentage = await this.updateVisibilityPercentage();
    if (visiblePercentage > this.viewportPercentage) {
      clearInterval(this.visibilityInterval);
      this.adLoad()
    }
  }

  startTimer = (adFound: any) => {
    if (this.customtimer) {
      clearInterval(this.customtimer);
    }

    this.customtimer = setInterval(async () => {
      const isViewLinkNullOrEmpty = !this.state.adResponse?.adViewedURL || this.state.adResponse.adViewedURL === '';
      const isPassbackEmpty = !this.state.adResponse?.passbackTag || this.state.adResponse.passbackTag === '';

      if (adFound && !isViewLinkNullOrEmpty && isPassbackEmpty) {
        const viewPercentage = await this.updateVisibilityPercentage();

        if (viewPercentage >= 50) {
          console.log('totalViewTime: ', this.totalViewTime);
          this.totalViewTime++
          this.savedViewPercentage = viewPercentage
          if (!this.OneSecMrcSent) {
            this.sendViewTime('mrc');
            this.OneSecMrcSent = true;
          }
        } else {
          this.sendViewTime('mrc');
        }

        if (this.state.adResponse?.standard === 'custom') {
          if (this.totalViewTime === this.state.adResponse?.minViewTime && viewPercentage >= this.state.adResponse?.minViewPercentage) {
            this.sendViewTime('custom');
          }
        }
      }

      this.timerCounter++
      if (this.timerCounter % 30 === 0) {
        clearInterval(this.customtimer);
        this.sendViewTime('mrc');
        this.adLoad()
      }
      console.log('timerCounter: ', this.timerCounter);
    }, 1000); // 1 second interval
  };

  getCurrentTimeMillis = () => {
    return Date.now().toString();
  };

  sendViewTime = (standard: string) => {
    if (
      this.totalViewTime > 0 &&
      (this.savedViewPercentage > 50 || this.savedViewPercentage >= this.state.adResponse?.minViewPercentage)
    ) {
      console.log('View Time: ', this.totalViewTime);

      let viewLink = this.state.adResponse?.adViewedURL;
      if (viewLink && viewLink !== '') {
        viewLink = viewLink.replace('{{EVENT_CLIENT_TIME}}', this.getCurrentTimeMillis());

        if (standard === 'mrc') {
          if (this.totalViewTime === 1) {
            viewLink = viewLink.replace('{{VIEWED_TIME}}', '1');
          } else {
            viewLink = viewLink.replace('{{VIEWED_TIME}}', this.totalViewTime.toString());
          }
          viewLink = viewLink.replace('{{VIEWED_PERCENTAGE}}', '50');
        } else {
          viewLink = viewLink.replace('{{VIEWED_TIME}}', this.state.adResponse?.minViewTime.toString());
          viewLink = viewLink.replace('{{VIEWED_PERCENTAGE}}', this.state.adResponse?.minViewPercentage.toString());
        }

        viewLink = viewLink.replace('_std', standard);
        (async () => { callViewability(viewLink); })();
      }

      if (standard === 'mrc' && this.OneSecMrcSent) {
        this.totalViewTime = 0;
        this.savedViewPercentage = 0;
      }
    }
  };

  callImpression = () => {
      if(this.state.adSuccess != -1) {
          const currentTimeMillis = Date.now();
          adRenderURL = this.state.adResponse.adRenderURL;
          adRenderURL = adRenderURL.replace('{{EVENT_CLIENT_TIME}}', currentTimeMillis);
          (async() => { callImpressionUrl(adRenderURL) })();
      };
  }

  // Callback function to update value in ParentComponent
  handleCallback = () => {
    console.log('renderAfterThanks');
    clearInterval(this.customtimer);
    this.sendViewTime('mrc');
    this.adLoad()
  }

  render() {
     var script = "scriptData";
     var adResponse = this.state.adResponse;
     if(this.state.adResponse != null) {
        script = this.state.adResponse.script;
        return(
          <View ref={this.viewRef} onLayout={this.updateVisibilityPercentage} style={{zIndex: 1,
               width: parseInt(typeof adResponse?.adSize !== 'undefined' ? adResponse.adSize.split('x')[0] : 320),
               height: parseInt(typeof adResponse?.adSize !== 'undefined' ?adResponse.adSize.split('x')[1]: 50)}}
               collapsable={false}>
               <AdView renderAfterThanks={this.handleCallback} adResponse={this.state.adResponse} scriptData = {script} adStatus = {this.state.adSuccess}/>
         </View>
       );
     }

    return(
      <View ref={this.viewRef} onLayout={this.updateVisibilityPercentage} style={{zIndex: 1,
        width: parseInt(this.props.adSize !== 'undefined' ? this.props.adSize.split('x')[0] : 320),
        height: parseInt(this.props.adSize !== 'undefined' ? this.props.adSize.split('x')[1] : 50), 
        backgroundColor: 'red'}}
        collapsable={false}>
      </View>
    );
  }

}