import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBar, CurrencyLabel } from '../../components';
  
import { dummyData, COLORS, FONTS, SIZES, icons } from '../../constants';
import { fromPairs, round } from 'lodash';

import { VictoryScatter, VictoryLine, VictoryChart, VictoryAxis} from 'victory-native';
import { VictoryCustomTheme } from '../../styles';
import Animated from 'react-native-reanimated';

const CryptoDetail = ({ route, navigation }) => {

  const [selectedCurrency, setSelectedCurrenry] = useState(null);

  const scrollX = new Animated.Value(0);
  const numberOfCharts = [1, 2, 3];

  useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrenry(currency)
  }, []);

  function renderChart() {
    return (
      <View style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...styles.shadow
      }}>

        {/* Header */}

        <View style={{ flexDirection: "row", marginTop: SIZES.padding, paddingHorizontal: SIZES.padding}}>
          <View style={{ flex: 1}}> 
            <CurrencyLabel icon={selectedCurrency?.image} currency={selectedCurrency?.currency} code={selectedCurrency?.code} />
          </View>
          <View>
            <Text style={{ ...FONTS.h3}}>{selectedCurrency?.amount}</Text>
            <Text style={{ color: selectedCurrency?.type == "I" ? COLORS.green : COLORS.red, ...FONTS.body3}}>{selectedCurrency?.changes}</Text>
            </View>
        </View>

        {/* Chart */}

        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          snapToInterval={SIZES.width - 40}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={Animated.event([
            { nativeEvent: {contentOffset: {x: scrollX
            }}}
          ], { useNativeDriver: false}
          )}
            
        >
          { numberOfCharts.map((item, index) => (
            <View key={`chart-${index}`} style={{ marginLeft: index === 0 ? SIZES.base : 0}}>
              <View style={{marginTop: -25}}>
                <VictoryChart 
                  theme={VictoryCustomTheme}
                  height={220}
                  width={SIZES.width - 40}
                >
                  <VictoryLine style={{ 
                      data: {
                        stroke: COLORS.secondary
                      },
                      parent: {
                        border: "1px solid #ccc"
                      }
                    }}
                    data={selectedCurrency?.chartData}
                    categories= {{
                      x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                      y: ["15", "30", "45"]
                    }}
                  />
                  <VictoryScatter 
                    data={selectedCurrency?.chartData}
                    size={7}
                    style={{
                      data: {
                        fill: COLORS.secondary
                      }
                    }}
                  />

                  <VictoryAxis style={{ grid: {stroke: "transparent"}}}/>

                  <VictoryAxis dependentAxis style={{ axis: { stroke: "transparent"},grid: {stroke: "gray"}}}/>

                </VictoryChart>
            </View>
          </View>
          ))}
          
        </Animated.ScrollView>

      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray1}}>
      <HeaderBar right={true}/>
      
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: SIZES.padding}}>
          {renderChart()}
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

export default CryptoDetail;
