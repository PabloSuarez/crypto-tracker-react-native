import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Platform} from 'react-native';
import Colors from '../../res/colors';

export class CoinsSearch extends Component {
  state = {
    query: '',
  };

  handleText = query => {
    this.setState({query});

    if (this.props.handleSearch) {
      this.props.handleSearch(query);
    }
  };

  render() {
    const {query} = this.state;

    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS == 'ios'
              ? styles.textInputIos
              : styles.textInputAndroid,
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder="Search cryptos"
          placeholderTextColor={Colors.white}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.charade,
    paddingLeft: 8,
    height: 46,
    color: Colors.white,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIos: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
