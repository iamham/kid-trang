import React, { Component } from 'react'
import {
  AppRegistry,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  View
} from 'react-native'
import NewRecordCard from '../components/NewRecordCard.react.js'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  footer: {
    height: 40,
    backgroundColor: 'white'
  }
})

export default class NewRecord extends Component {

  static propTypes = {
    firebaseApp: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView>
          <NewRecordCard {...this.props} />
        </ScrollView>
        <View style={styles.footer}>
          <Text>Footer Here</Text>
        </View>
      </View>
    )
  }
  
}
