import React, { Component } from 'react';
import Dropdowns from './Dropdowns';
import Answer from './Answer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      stars: [],
      favoriteCandyLand: [],
      bars: [],
      randomStates: [],
      randomBars: []
    }
  }

  async componentDidMount() {
    let result = await fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=state-by-state-favorite-halloween-candy&rows=51&facet=name')
    let data = await result.json();
    let states = await data.records.reduce((tally,current) => {
          tally.push(current.fields.name);
          return tally;
      },[]);
      console.log(states)
    let candies = await data.records.reduce((tally,current) => {
          tally.push(current.fields.top_candy);
          return tally;
      },[]);
      console.log(candies)

      let randomStates = this.random(states);
      let randomBars = this.random(candies);
      randomBars = this.remove_duplicates(randomBars);
      console.log(randomBars);
      
      this.setState({
        stars: states,
        bars: candies,
        randomStates: randomStates
      })
  }

  remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
  }

  random(arr) {
    let randomArr = [];
    for(let i = 0; i < arr.length; i++){
      let selector = Math.floor(Math.random() * arr.length);
      while(randomArr.indexOf(arr[selector]) !== -1){
          selector = Math.floor(Math.random() * arr.length);
      }
      randomArr[i] = arr[selector];
    }
    return randomArr;
  }

  
  render() {
    
    return (
      <div className="App">
        <div className="container-custom">
          <Dropdowns
            stars={this.random(this.state.stars)}/>
          <Answer />
        </div>
      </div>
    );
  }
}

export default App;
