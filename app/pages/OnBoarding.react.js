import React, { Component } from 'react'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import {
  AppRegistry,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Button
} from 'react-native'
import * as firebase from 'firebase'

const styles = StyleSheet.create({
  container: {
    
  }
})

export default class OnBoarding extends Component {

  static propTypes = {
    onLogin: React.PropTypes.func,
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.props.onLogin}
          title='Login'
          accessibilityLabel='Login'
        />
      </View>
    )
  }
}