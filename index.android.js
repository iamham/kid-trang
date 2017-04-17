import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
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

export default class KidTrang extends Component {

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
  }

  getIsUserAuthenticated = () => firebaseApp.auth().currentUser || false

  onLogin = () => {
    this.manager.authorize('google', {scopes: 'email'})
    .then(resp => {
      console.warn(resp.response.credentials)
      const credential = firebase.auth.GoogleAuthProvider.credential(resp.response.credentials.idToken)
      firebaseApp.auth().signInWithCredential(credential)
      .then(resp => console.log('success', resp))
      .catch(err => console.log('error', err))
    })
    .catch(err => console.log('There was an error', err))
  }

  render = () => {
    console.log(this.manager)
    return this.getIsUserAuthenticated() ? <MainLayout /> : <OnBoarding onLogin={this.onLogin}/>
  }
}

AppRegistry.registerComponent('KidTrang', () => KidTrang);
