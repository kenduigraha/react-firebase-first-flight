import dotenv from 'dotenv';
dotenv.config({ silent: true });
import React, { Component } from 'react';
import * as firebase from 'firebase';

import './App.css';

class App extends Component {
  componentDidMount() {
    let config = {
        apiKey: process.env.REACT_APP_firebase_apiKey,
        authDomain: process.env.REACT_APP_firebase_authDomain,
        databaseURL: process.env.REACT_APP_firebase_databaseURL,
        projectId: process.env.REACT_APP_firebase_projectId,
        storageBucket: process.env.REACT_APP_firebase_storageBucket,
        messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
      };

    firebase.initializeApp(config);
    let bigOne = document.getElementById('bigOne');
    let dbRef = firebase.database().ref().child('text');
    dbRef.on('value', snap => bigOne.innerText = snap.val());
  }

  render() {
    return (
      <div className="App">
        <div className="App--header">
          <h2>Welcome to React and Firebase</h2>
        </div>
        <pre className="App--data">
          One day, some data from Firebase will go here.
        </pre>

        <hi id="bigOne"></hi>
      </div>
    );
  }
}

export default App;
