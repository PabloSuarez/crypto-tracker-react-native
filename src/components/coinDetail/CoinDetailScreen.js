import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import CoinMarketItem from '../coinDetail/CoinMarketItem';
import Colors from '../../res/colors';
import http from '../../libs/http';
import Storage from '../../libs/storage';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  toggleFavorite = async () => {
    const {isFavorite, coin} = this.state;
    if (isFavorite) {
      this.removeFavorite();
    } else {
      let newCoin = {...coin, isFavorite: true};
      const resp = await Storage.instance.store(
        `coin-${coin.id}`,
        JSON.stringify(newCoin),
      );
      if (resp) this.setState({isFavorite: true});
    }
  };

  removeFavorite = async () => {
    Alert.alert('Remove Favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const {coin} = this.state;
          const resp = await Storage.instance.remove(`coin-${coin.id}`);
          if (resp) this.setState({isFavorite: false});
        },
        style: 'destructive',
      },
    ]);
  };

  getFavorite = async () => {
    const {coin} = this.state;
    const resp = await Storage.instance.get(`coin-${coin.id}`);
    try {
      if (resp && JSON.parse(resp).isFavorite) {
        this.setState({isFavorite: true});
      }
    } catch (error) {
      console.log('Error reading coin', error);
    }
  };

  componentDidMount() {
    const coin = this.props.route.params.coin;
    this.props.navigation.setOptions({title: coin.symbol});
    this.setState({coin: coin}, () => {
      this.getFavorite();
      this.getMarkets(coin.id);
    });
  }

  getSymbol(coinName) {
    if (coinName) {
      const formatedName = coinName.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${formatedName}.png`;
    }
    return null;
  }

  getSections(coin) {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  }

  getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await http.instance.get(url);
    this.setState({markets});
  };

  render() {
    const {coin, markets, isFavorite} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbol(coin.name)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.sectionText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={[styles.marketTitle, styles.titleText]}>Markets</Text>

        <FlatList
          style={styles.flatList}
          horizontal={true}
          data={markets}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => (
            <CoinMarketItem style={styles.sectionText} item={item} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  section: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketTitle: {
    marginBottom: 10,
    marginTop: 30,
  },
  flatList: {
    flexWrap: 'wrap',
    flexGrow: 0,
    marginRight: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
});

export default CoinDetailScreen;
