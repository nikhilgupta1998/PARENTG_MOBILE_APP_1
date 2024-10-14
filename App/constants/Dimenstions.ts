import {Dimensions} from 'react-native';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;
export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;
