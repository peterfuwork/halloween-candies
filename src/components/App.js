import React, { Component } from 'react';
import Dropdowns from './Dropdowns';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stars: [],
      favoriteCandyLand: [],
      bars: [],
      randomStates: [],
      randomBars: [],
      selectedState: '',
      selectedBar: '',
      correctOrNot: null,
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

      let randomStates = this.shuffle(states);
      let randomBars = this.shuffle(candies);
      randomBars = this.remove_duplicates(randomBars);
      console.log(randomStates);
      console.log(randomBars);

      this.setState({
        stars: states,
        bars: candies,
        randomStates: randomStates,
        randomBars: randomBars
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

  shuffle(list) {
    let array = [...list];
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  checkPair = (e) => {
    e.preventDefault();    
    if(this.state.selectedBar !== '' && this.state.selectedState !== ''){
      let stateIndex = this.state.stars.indexOf(this.state.selectedState)
      console.log(this.state.stars)
      let barIndexArr = this.state.bars.map(item => {
        if(item === this.state.selectedBar){
          return item;
        }
        else{
          return '';
        }
      })
      this.setState({
        correctOrNot: (barIndexArr[stateIndex] === this.state.selectedBar)
      })  
    } 
  }

  handleStateSelect = (e) => {
    this.setState({
      selectedState: e.target.value
    })
  }

  handleBarSelect = (e) => {
    this.setState({
      selectedBar: e.target.value
    })
  }

  render() {
    
    return (
      <div className="App">
        <div className="container-custom">
        <Dropdowns 
          randomStates={this.state.randomStates}
          randomBars={this.state.randomBars}
          handleStateSelect={this.handleStateSelect}
          handleBarSelect={this.handleBarSelect}
          selectedState={this.state.selectedState}
          selectedBar={this.state.selectedBar}
          checkPair={this.checkPair}
          correctOrNot={this.state.correctOrNot}
           />
        </div>
      </div>
    );
  }
}

export default App;
