import React from 'react';
import {Image, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from './src/res/colors';
import CoinsStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  LogBox.ignoreLogs(['Remote debugger']);

  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          name="CoinsStack"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => {
              return (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('./src/assets/bank.png')}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="FavoritesStack"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({size, color}) => {
              return (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('./src/assets/star.png')}
                />
              );
            },
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
