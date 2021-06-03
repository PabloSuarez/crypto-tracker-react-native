import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import Colors from '../../res/colors';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowOpacity: 0,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="favorites" component={FavoritesScreen} />
      <Stack.Screen name="favoritesDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
