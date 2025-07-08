// Define the BlockLevel enum
export enum BlockLevel {
    AdCoveringContent = 'adCoveringContent',
    AdWasInappropriate = 'adWasInappropriate',
    NotInterestedInCampaign = 'notInterestedInCampaign',
    NotInterestedInBrand = 'notInterestedInBrand',
    NotInterestedInBrandType = 'notInterestedInBrandType',
    NotInterestedInClientType = 'notInterestedInClientType',
  }
  
  // Create a function to get info for each BlockLevel
  export function getBlockLevelInfo(blockLevel: BlockLevel): { blockLevelCode: string; blockLevelDesc: string } {
    switch (blockLevel) {
      case BlockLevel.AdCoveringContent:
        return {
          blockLevelCode: 'overlappingAd',
          blockLevelDesc: 'Ad is covering the content of the website.',
        };
      case BlockLevel.AdWasInappropriate:
        return {
          blockLevelCode: 'inappropriateAd',
          blockLevelDesc: 'Ad was inappropriate.',
        };
      case BlockLevel.NotInterestedInCampaign:
        return {
          blockLevelCode: 'notInterestedInCampaign',
          blockLevelDesc: "I'm not interested in seeing ads for this product.",
        };
      case BlockLevel.NotInterestedInBrand:
        return {
          blockLevelCode: 'notInterestedInBrand',
          blockLevelDesc: "I'm not interested in seeing ads for this brand.",
        };
      case BlockLevel.NotInterestedInBrandType:
        return {
          blockLevelCode: 'notInterestedInBrandType',
          blockLevelDesc: "I'm not interested in seeing ads for this category.",
        };
      case BlockLevel.NotInterestedInClientType:
        return {
          blockLevelCode: 'notInterestedInClientType',
          blockLevelDesc: "I'm not interested in seeing ads from pharmaceutical brands.",
        };
      default:
        return { blockLevelCode: '', blockLevelDesc: '' };
    }
  }
  
  // Example usage
  // const exampleBlockLevel = BlockLevel.AdCoveringContent;
  // const info = getBlockLevelInfo(exampleBlockLevel);
  // console.log(info); // Output: { blockLevelCode: 'overlappingAd', blockLevelDesc: 'Ad is covering the content of the website.' }
  