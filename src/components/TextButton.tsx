import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, SIZES, FONTS} from '../constants';

const TextButton = ({ label, customContainerStyle, customLabelStyle,onPress}) => {
  return (
    <TouchableOpacity 
      style={{
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.green,
        ...customContainerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{color: COLORS.white, ...FONTS.h3, ...customLabelStyle}}>{label}</Text>

    </TouchableOpacity>
  );
}

export default TextButton;