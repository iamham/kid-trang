import React, { Component } from 'react'
import {
  Button,
  AppRegistry,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  View
} from 'react-native'
import PersonalRecordRow from './PersonalRecordRow.react.js'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    alignItems: 'flex-start',
    padding: 10
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    borderRadius: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  personalList: {
    marginBottom: 10,
  }
})

export default class NewRecordCard extends Component {

  onAddMorePersonal = () => {
    return true
  }

  renderItem = (item) => {
    return <PersonalRecordRow item={item} />
  }

  renderPersonal = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Personal List</Text>
        <View style={styles.personalList}>
          <FlatList
            data={[{key: 'a', name: 'Person 1', price: 10}, {key: 'b', name: 'Person 2', price: 20}]}
            renderItem={({item}) => this.renderItem(item)}
          />
        </View>
        <Button
          onPress={this.onAddMorePersonal}
          title='+'
          accessibilityLabel='Add more person'
        />
      </View>
    )
  }

  renderPublic = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Public List</Text>
        <Button
          onPress={this.onAddMorePersonal}
          title='+'
          accessibilityLabel='Add List'
        />
      </View>
    )
  }
  
  render = () => (
    <View style={styles.container}>
      {this.renderPublic()}
      {this.renderPersonal()}
    </View>
  )
}