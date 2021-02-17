import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { HeaderBar, CurrencyLabel, TextButton, TransactionHistory } from '../../components';
import { dummyData, COLORS, SIZES, FONTS } from '../../constants';

const Transaction = ({ route }) => {

  const [selectedCurrenry, setSelectedCurrenry] = useState(null);

  useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrenry(currency)
  }, []);

  function renderTrade() {
    return (
      <View
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow
        }}
      >
        <CurrencyLabel 
          icon={selectedCurrenry?.image}
          currency={selectedCurrenry?.currency}
          code={selectedCurrenry?.code}
        />

        <View
          style={{
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding * 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...FONTS.h2}}>{selectedCurrenry?.wallet.crypto} {selectedCurrenry?.code}</Text>
          <Text style={{color: COLORS.gray, ...FONTS.body4}}>R${selectedCurrenry?.wallet.value}</Text>
        </View>

        <TextButton label="Trade" onPress={() => console.log("Trade")}/>
      </View>
    )
  }

  function renderTransactionHistory() {
    return (
      <TransactionHistory
        customContainerStyle={{
          ...styles.shadow
        }}
        history={selectedCurrenry?.transactionHistory}
      />
    )
  }
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <HeaderBar right={false}/>

      <ScrollView>
        <View style={{flex: 1, paddingBottom: SIZES.padding}}>
          {renderTrade()}
          {renderTransactionHistory()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Transaction;
