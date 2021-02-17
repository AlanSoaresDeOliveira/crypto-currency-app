import React from 'react';
import { Image, Text, View } from 'react-native';

import { COLORS, SIZES, FONTS, icons} from '../constants';

interface HeaderChart {
  icon: any;
  currency?: string;
  code?: string;
}

const CurrencyLabel = ({ icon, currency, code }: HeaderChart) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image source={icon} resizeMode="cover" style={{ width: 25, height: 25, marginTop: 5}}/>

      <View style={{ marginLeft: SIZES.base}}>
        <Text style={{ ...FONTS.h3}}>{currency}</Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4}}>{code}</Text>
      </View>
    </View>
  )
}

export default CurrencyLabel;