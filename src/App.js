import React, { Component } from 'react';
import { firebaseDatabase } from './firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      newData: ''
    };

    this.dataRef = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // initialization database fireabase ref()
    this.dataRef = firebaseDatabase.ref('/text');

    // console.log all data from firebase database
    
    // callback way
    // firebaseDatabase.ref().on('value', data => console.log(data.val()));
    
    // promise way
    firebaseDatabase.ref()
                    .once('value')
                    .then(data => console.log(data.val()))
    // .on('child_addded', data => data.val()) -> to get the value of children's attribute
    
    // this.dataRef // will log the exactly value of child / ref (text)
    this.dataRef
        .on('value', data => {
          console.log(data.hasChildren())
        });
    
    // set state from firebase database name text
    // firebaseDatabase.ref().child('text')
    this.dataRef
        .on('value', snap => {
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

  handleChange(e){
    let newData = e.target.value.trim();
    
    this.setState({
      // newData: newData
      newData
    })
  }

  handleSubmit(e){
    e.preventDefault();
    
    const newData = this.state.newData;

    if (newData !== "") {
      // firebaseDatabase.ref().set({
      //   text: newData
      // });

      // OR
      // firebaseDatabase.ref()
      //                 .child('text')
      //                 .set(newData);
      
      // OR
      // firebaseDatabase.ref('/text')
      this.dataRef
                      // .child('text')
                      //.push(newData) // -> will create unique attribute with newData value inside child / ref (text)
                      .set(newData);

      this.setState({
        newData: ''
      });
    }
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
        <form
          className="App-form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            value={this.state.newData}
            onChange={this.handleChange}
          />
          <input
            type="submit"
          />
        </form>

        <hi id="bigOne"></hi>
      </div>
    );
  }
}

export default App;
