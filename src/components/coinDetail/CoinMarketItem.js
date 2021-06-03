import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CoinMarketItem = ({item}) => {
  return (
    <View
      style={styles.container}
      key={`${item.id}${item.price_usd}${item.quote}`}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.text}>${item.price_usd.toFixed(1)}</Text>
    </View>
  );
};

export default CoinMarketItem;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    padding: 10,
    borderColor: '#9998',
    borderWidth: 2,
    alignContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  nameText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
