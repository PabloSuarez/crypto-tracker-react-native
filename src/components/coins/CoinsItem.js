import React from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import Colors from '../../res/colors';

const doowIcon = require('../../assets/arrow_down.png');
const upIcon = require('../../assets/arrow_up.png');

const CoinsItem = ({item, onPress}) => {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return upIcon;
    }
    return doowIcon;
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{item.price_usd}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imgArrow} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 12,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 12,
  },
  priceText: {
    color: '#fff',
  },
  imgArrow: {
    height: 22,
    width: 22,
  },
});

export default CoinsItem;
