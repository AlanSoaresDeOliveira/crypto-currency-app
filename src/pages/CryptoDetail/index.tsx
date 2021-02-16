import React from 'react';
import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBar } from '../../components';
 
import { dummyData, COLORS, FONTS, SIZES, icons } from '../../constants';

const CryptoDetail = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray1}}>
      <HeaderBar right={true}/>
    </SafeAreaView>
  );
};
export default CryptoDetail;
