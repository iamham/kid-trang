import React, { Component } from 'react'
import {
  Button,
  TouchableOpacity,
  AppRegistry,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  View,
  Modal,
  TouchableHighlight
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'row',
    height: 35,
    borderStyle: 'dashed',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  information: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  spacer: {
      flex:1,
  }
})

export default class PersonalRecordRow extends Component {

  static propTypes = {
    item: React.PropTypes.object
  }

  state = {
    modalVisible: false
  }

  onToggleEditMode = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  renderModal = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={{marginTop: 22, width: '50%'}}>
        <View>
        <Text>Hello World!</Text>
        <TouchableHighlight onPress={() => {
            this.onToggleEditMode()
        }}>
            <Text>Hide Modal</Text>
        </TouchableHighlight>
        </View>
      </View>
    </Modal>
    )
  }

  render = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onToggleEditMode}> 
          {this.renderModal()}
          <View style={styles.information}>
            <Text>
              {this.props.item.name}
            </Text>
            <View style={styles.spacer}/>
            <Text>
              {this.props.item.price} ฿
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}