import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';
import CoinsItem from '../coins/CoinsItem';

class FavoritesScreen extends Component {
  state = {
    isLoading: true,
    FavoriteCryptos: [],
  };

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllkeys();
      if (allKeys) {
        const respAllKeys = await Storage.instance.multiGet(allKeys);
        const FavoriteCryptos = respAllKeys.map(crypto =>
          JSON.parse(crypto[1]),
        );
        if (FavoriteCryptos) this.setState({FavoriteCryptos, isLoading: false});
      }
    } catch (err) {
      console.log('GetFavorites err', err);
      this.setState({isLoading: false});
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.getFavorites);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  handlePress = coin => {
    this.props.navigation.navigate('favoritesDetail', {coin});
  };

  displayCryptos = () => {
    const {FavoriteCryptos, loading} = this.state;
    if (!loading && FavoriteCryptos.length) {
      return (
        <FlatList
          data={FavoriteCryptos}
          renderItem={({item}) => (
            <CoinsItem onPress={() => this.handlePress(item)} item={item} />
          )}
        />
      );
    }
  };

  render() {
    const {FavoriteCryptos, loading} = this.state;

    return (
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator
            color={Colors.white}
            size="large"
            style={styles.loader}
          />
        )}
        {!loading && !FavoriteCryptos.length && <FavoritesEmptyState />}

        {this.displayCryptos()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
});

export default FavoritesScreen;
