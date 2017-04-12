import React, { Component } from 'react';
import { firebaseDatabase } from './firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    // console.log all data from firebase database
    firebaseDatabase.ref().on('value', data => console.log(data.val()));
    
    // set state from firebase database name text
    firebaseDatabase.ref().child('text').on('value', snap => {
      this.setState({
        data: snap.val()
      });
    });

    /**
     * old school way :
     */
    // let bigOne = document.getElementById('bigOne');
    // let dbRef = firebaseDatabase.ref().child('text');
    // dbRef.on('value', snap => bigOne.innerText = snap.val());
  }

  render() {
    return (
      <div className="App">
        <div className="App--header">
          <h2>Welcome to React and Firebase</h2>
        </div>
        <pre className="App--data">
          {/*One day, some data from Firebase will go here.*/}
          { this.state.data }
          {/*{ JSON.stringify(this.state.data) }*/}
        </pre>

        <hi id="bigOne"></hi>
      </div>
    );
  }
}

export default App;
