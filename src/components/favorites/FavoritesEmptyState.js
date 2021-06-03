import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';

const FavoritesEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavoritesEmptyState;
