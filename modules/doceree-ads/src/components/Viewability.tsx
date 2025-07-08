import { UIManager, findNodeHandle } from "react-native";

const checkViewVisibility = ({ viewRef, parentRef }) => {
  return new Promise<number>((resolve) => {
    if (viewRef.current && parentRef.current) {
      UIManager.measure(findNodeHandle(parentRef.current), (parentX, parentY, parentWidth, parentHeight, parentPageX, parentPageY) => {
        UIManager.measure(findNodeHandle(viewRef.current), (childX, childY, childWidth, childHeight, childPageX, childPageY) => {
          const visibleHeight = Math.min(childPageY + childHeight, parentPageY + parentHeight) - Math.max(childPageY, parentPageY);
          const visibleWidth = Math.min(childPageX + childWidth, parentPageX + parentWidth) - Math.max(childPageX, parentPageX);

          const validVisibleHeight = Math.max(0, visibleHeight);
          const validVisibleWidth = Math.max(0, visibleWidth);
          const visibleArea = validVisibleHeight * validVisibleWidth;
          const totalArea = childWidth * childHeight;
          const visiblePercentage = (visibleArea / totalArea) * 100;
          
          resolve(visiblePercentage);
        });
      });
    } else {
      resolve(0.0);
    }
  });
};

export default checkViewVisibility;
