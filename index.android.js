import React, { Component } from 'react'
import { AppRegistry, ToastAndroid, ActivityIndicator, View, StyleSheet } from 'react-native'
import MainLayout from './app/pages/MainLayout.react.js'
import OnBoarding from './app/pages/OnBoarding.react.js'
import * as firebase from 'firebase'
import OAuthManager from 'react-native-oauth'

const supportedProviders = OAuthManager.providers()

const firebaseConfig = {
  apiKey: 'AIzaSyAc4IJBLT1FlXPbOgz7rdgjHP7-_VFcReU',
  authDomain: 'kid-tarng.firebaseapp.com',
  databaseURL: 'https://kid-tarng.firebaseio.com',
  projectId: 'kid-tarng',
  storageBucket: 'kid-tarng.appspot.com',
  messagingSenderId: '6973864535'
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
})

export default class KidTrang extends Component {

  state = {
    currentUser: null,
    loading: false,
  }

  componentWillMount = () => {
    const manager = new OAuthManager('KidTrang')
    manager.configure({
      google: {
        callback_url: 'http://localhost/google',
        client_id: '6973864535-ndjtdotghsiakte0vj7n8eqqb031kqe2.apps.googleusercontent.com',
        client_secret: 'YBMnRAs6ggjtfYX5BBDdkwSD'
      }
    })
    this.manager = manager
    const currentUser = this.getIsUserAuthenticated()
    this.setState({ currentUser: currentUser || false })
  }

  getIsUserAuthenticated = () => firebaseApp.auth().currentUser || false

  onLogin = () => {
    this.setState({ loading: true })
    this.manager.authorize('google', {scopes: 'email'})
    .then(resp => {
      const credential = firebase.auth.GoogleAuthProvider.credential(resp.response.credentials.idToken)
      firebaseApp.auth().signInWithCredential(credential)
      .then(resp => this.onSuccess(resp))
      .catch(err => this.onFailure(err))
    })
    .catch(err => this.onFailure(err))
  }

  onSuccess = (response) => {
    this.setState({ currentUser: response })
    ToastAndroid.show('Logged in as ' + response.displayName, ToastAndroid.SHORT)
  }

  onFailure = (err) => {
    this.setState({ loading: false })
    console.warn('Error signing in', err)
    ToastAndroid.show('There was a problem signing you in, Please try again', ToastAndroid.SHORT)
  }

  renderLoadingState = () => {
    return this.state.loading ? (<ActivityIndicator
      animating={true}
      style={[styles.centering, {height: 80}]}
      size="large"
    />) : null
  }

  render = () => {
    console.log(this.getIsUserAuthenticated())
    if (this.state.currentUser) return <MainLayout firebaseApp={firebaseApp} />
    return (
      <View>
        {this.renderLoadingState()}
        <OnBoarding onLogin={this.onLogin} />
      </View>
    )
  }
}

AppRegistry.registerComponent('KidTrang', () => KidTrang)
