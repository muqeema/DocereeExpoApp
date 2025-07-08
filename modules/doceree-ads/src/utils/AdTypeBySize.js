import {Constants} from './constants.js'

const getAdTypeBySize = (adSize) => {
    switch (adSize) {
        case "320 x 50":
          return Constants.AdType.banner;
        case "300 x 250":
        case "200 x 200":
        case "250 x 250":
          return Constants.AdType.mediumRectangle;
        case "320 x 100":
          return Constants.AdType.largeBanner;
        case "468 x 60":
          return Constants.AdType.fullSize;
        case "728 x 90":
          return Constants.AdType.leaderboard;
        case "300 x 50":
          return Constants.AdType.smallBanner;
        default:
          return Constants.AdType.invalid;
    }
}
export default getAdTypeBySize;