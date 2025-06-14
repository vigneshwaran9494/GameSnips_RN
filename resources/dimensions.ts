import { Dimensions, PixelRatio } from "react-native";

const wp = (widthPercent: number | string, getScreenWidth?: boolean) => {
  const screenWidth = Dimensions.get("window").width;
  const elemWidth = parseFloat(widthPercent as string);
  return getScreenWidth
    ? screenWidth * (parseFloat(widthPercent as string) / 100)
    : PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const hp = (heightPercent: number | string) => {
  const screenHeight = Dimensions.get("window").height;
  const elemHeight = parseFloat(heightPercent as string);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
export { hp, wp };

