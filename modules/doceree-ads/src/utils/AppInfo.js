
import DeviceInfo from 'react-native-device-info';
import UserAgent from 'react-native-user-agent';
import { getAdvertisingInfo } from 'react-native-advertising-info';

export const getAppInfo = async () => {
    const appName = await DeviceInfo.getApplicationName();
    const version = await DeviceInfo.getVersion();
    const bundleId = await DeviceInfo.getBundleId();

    const info = {
        appName,
        version,
        bundleId,
    };
    return info
};

export const getUserAgent = async () =>  {
    try {
        const userAgent = UserAgent.getWebViewUserAgent() //asynchronous
        return userAgent
    } catch (error) {
        console.error('Error retrieving User Agent:', error)
        throw error;
    }
}

export const getAdvertisingId = async () =>  {
    try {
        const adInfo = await getAdvertisingInfo()
        return adInfo
    } catch (error) {
        console.error('Error retrieving Advertising ID:', error);
        throw error;
    }
}

let applicationKey = "";
export const getAppKey = () => {
  return applicationKey;
}

export const setAppKey = (appKey) => {
  applicationKey = appKey;
}

export const getIsTablet = () => {
   return DeviceInfo.isTablet();
}
