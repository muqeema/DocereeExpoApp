import Header from './Header.js';
import { getAdvertisingId } from '../utils/AppInfo.js'
import LibNetwork from './LibNetwork'
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../constant/strings';

export const PatientSessionApi = async (sessionId = "", status = 0) => {
    const header = new Header();
    var headerJson = {};
    try {
      headerJson = await header.getHeaders();
      console.log('fetching data:', headerJson);
    } catch (error) {
      console.error('PatientSessionApi Error fetching header:', error);
      headerJson = {};
      throw error;
    }

    var hcpId = "";
    var hcp = await AsyncStorage.getItem(strings.CONSTANT.HcpData);
    if (hcp) {
      const hcpData = JSON.parse(hcp);
      hcpId = hcpData.hcpId
    }

    var adInfo = await getAdvertisingId();
    console.log("advertisingId", adInfo.advertisingId );
    const url = `${LibNetwork.getBaseUrl()}${LibNetwork.patientSessionPath}?uid=${adInfo.advertisingId}&sid=${sessionId}&hid=${hcpId}&status=${status}&eType=4`;
    console.log("url:", url);
    try {
        const response = await fetch(url, {
          headers: headerJson,
        });
        if (!response.ok) {
            console.log("PatientSessionApi response: ",response.status);
            throw new Error('Network response was not ok');
        } else {
            console.log("PatientSessionApi response: ",response.status);
        }
    } catch (error) {
        console.error('PatientSessionApi Failed Api:', error);
        throw error;
    }
};
