import React, { Component } from 'react'
import {
  Button,
  AppRegistry,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  View,
  Modal
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

  static propTypes = {
    firebaseApp: React.PropTypes.object.isRequired,
  }

  state = {
    showAddPersonal: false,
    showAddPublic: false,
    text: '',
  }

  componentWillMount = () => {
    const database = this.props.firebaseApp.database()
  }

  onAddMorePersonal = () => {
    return true
  }

  toggleAddPersonalModal = () => this.setState({ showAddPersonal: !this.state.showAddPersonal })
  toggleAddPublicModal = () => this.setState({ showAddPublic: !this.state.showAddPublic })

  renderAddPersonalModal = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.showAddPersonal}
        onRequestClose={this.toggleAddPersonalModal}
        >
        <View style={styles.container}>
          <Text>Personal</Text>
        </View>
      </Modal>
    )
  }

  renderAddPublicModal = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.showAddPublic}
        onRequestClose={this.toggleAddPublicModal}
        >
        <View style={styles.container}>
          <Text>Public</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Food Name"
            onChangeText={(text) => this.setState({text})}
          />
        </View>
      </Modal>
    )
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
          onPress={this.toggleAddPersonalModal}
          title='+'
          accessibilityLabel='Add more person'
        />
        {this.renderAddPersonalModal()}
        {this.renderAddPublicModal()}
      </View>
    )
  }

  renderPublic = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Public List</Text>
        <Button
          onPress={this.toggleAddPublicModal}
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