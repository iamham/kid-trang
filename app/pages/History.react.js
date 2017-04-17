import React, { Component } from 'react'
import {
  AppRegistry,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native'

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
});

export default class History extends Component {

  render() {
    return (
      <View style={styles.page}>
        <Text>Test</Text>
      </View>
    )
  }
  
}
