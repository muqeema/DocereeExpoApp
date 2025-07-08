
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InstalledApps } from 'react-native-launcher-kit';
import {sendDataCollection} from './api/DataCollectionApi';
import strings from './constant/strings';
import { Platform } from 'react-native';
import {setAppKey} from './utils/AppInfo.js';

export class DocereeAds {


  static CONSTANT = {
    eventShare : "shr",
    eventComment : "cmt",
    eventLike : "lik",
    eventPatientId : "pid",
    eventOfficeId : "oif",
    eventProviderId : "pro",
    eventEnc : "enc",
    eventEnx : "enx",
    eventScd : "scd"
  };

  static Data = {
    CollectDataStatus : true
  }

  // static applicationKey = ""
  initialize = (appKey) => {
    applicationKey = appKey;
    setAppKey(applicationKey)
  }


    sendData = (rxCodes, dxCodes, editorialTags, event) => {
      if(DocereeAds.Data.CollectDataStatus){
        console.log('rxCodes, dxCodes, editorialTags, event : ', rxCodes, dxCodes, editorialTags, event);
        if(!(Array.isArray(rxCodes) && rxCodes.length)){
          rxCodes = [];
        }

        if(!(Array.isArray(dxCodes) && dxCodes.length)){
          dxCodes = [];
        }

        if(!(Array.isArray(editorialTags) && editorialTags.length)){
          editorialTags = [];
        }

        if(!(event)){
          event = {};
        }

        AsyncStorage.getItem(strings.CONSTANT.HcpData).then(asyncStorageRes => {
            // console.log("DocereeAd HCP: ", JSON.parse(asyncStorageRes));
            hcp = JSON.parse(asyncStorageRes);
            appList =  new Array(0);
            if (Platform.OS === 'android') {
                installedApps = InstalledApps.getApps();
                // console.log("installedApps: ", installedApps);
                appList = new Array(installedApps.length);
                installedApps.map((app) => {
                    if(app.packageName !== undefined)
                      appList.push(app.packageName);
                });

                appList = appList.filter(function(element){
                   return element !== undefined;
                });
              } else if (Platform.OS === 'ios') {

              }


            sendDataCollection(hcp, rxCodes, dxCodes, editorialTags, event, appList);
        });


      }
    }

}