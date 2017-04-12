import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

class App extends Component {
  componentDidMount() {
    
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
