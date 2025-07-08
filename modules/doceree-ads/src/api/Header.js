
import { getAdvertisingId, getAppInfo } from '../utils/AppInfo.js';

class Header {
    constructor() {
    }

    async getHeaders() {
        try {
            const adInfo = await getAdvertisingId();
            // const userAgent = await getUserAgent()
            const appInfo = await getAppInfo()

            const deviceInfoState = {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'User-Agent': userAgent,
                'doceree-device-id': adInfo.advertisingId,
                'is-ad-tracking-enabled': adInfo.adTrackingEnabled,
                'app-name': appInfo.appName,
                'app-version': appInfo.version,
                'lib-version': '5.0.5-4-gbbaaa60',
                'app-bundle': appInfo.bundleId
            };
            return deviceInfoState;
        } catch (error) {
            console.error('Error fetching device info:', error);
            throw error;
        }
    }

}

export default Header;
