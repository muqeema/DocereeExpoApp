
import {Constants} from './constants.js'
import getAdTypeBySize from './AdTypeBySize.js'

const mediumRectangle = (adSize) => {
    let adType = getAdTypeBySize(adSize);
    if (adType == Constants.AdType.mediumRectangle) {
        console.log('mediumRectangle');
        return true;
    } else {
        console.log('not mediumRectangle');
        return false;
    }
}
export default mediumRectangle;