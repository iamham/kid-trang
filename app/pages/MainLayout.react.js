import React, { Component } from 'react'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import {
  AppRegistry,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native'
import ToolbarAndroid from 'ToolbarAndroid'
import NewRecord from './NewRecord.react.js'
import History from './History.react.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 5,
    height: 45,
    backgroundColor: '#2196F3',
    paddingLeft: 10
  },
  headerFont: {
    fontSize: 20,
    color: 'white',
  },
})

export default class MainLayout extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'New Record' },
      { key: '2', title: 'History' },
    ],
  };

  onRequestChangeTab = (index) => { this.setState({ index }) }

  renderHeader = (props) => {
    return <TabBar {...props} />
  }

  renderPage = ({ route }) => {
    switch (route.key) {
    case '1':
      return <NewRecord />
    case '2':
      return <History />
    default:
      return null
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#2196F3"
          barStyle="default"
        />
        <View style={styles.header}>
          <Text style={styles.headerFont}>Kid-Trang</Text>
        </View>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderPage}
          renderHeader={this.renderHeader}
          onRequestChangeTab={this.onRequestChangeTab}
        />
      </View>
    )
  }
}
