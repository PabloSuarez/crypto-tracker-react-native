import React, {Component} from 'react';
import {View, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import Http from '../../libs/http';
import Colors from '../../res/colors';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

class CoinsScreen extends Component {
  state = {
    cryptos: [],
    allCryptos: [],
    loading: true,
  };

  componentDidMount = () => {
    this.getCryptos();
  };

  getCryptos = async () => {
    const {data: cryptos} = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({cryptos, allCryptos: cryptos, loading: false});
  };

  handlePress = coin => {
    this.props.navigation.navigate('CoinsDetail', {coin});
  };

  handleSearch = query => {
    const {allCryptos} = this.state;
    this.setState({loading: true});

    const cryptoFiltered = allCryptos.filter(cry => {
      return (
        cry.name.toLowerCase().includes(query.toLowerCase()) ||
        cry.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({cryptos: cryptoFiltered, loading: false});
  };

  render() {
    const {cryptos, loading} = this.state;
    return (
      <View style={styles.container}>
        <CoinsSearch handleSearch={this.handleSearch} />

        {loading && (
          <ActivityIndicator
            color={Colors.white}
            size="large"
            style={styles.loader}
          />
        )}
        <FlatList
          data={cryptos}
          renderItem={({item}) => (
            <CoinsItem onPress={() => this.handlePress(item)} item={item} />
          )}
        />
      </View>
    );
  }
}
export default CoinsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
    paddingTop: 30,
  },
  loader: {
    marginTop: 60,
  },
});
