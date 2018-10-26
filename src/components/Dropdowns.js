import React, { Component } from 'react';

const Dropdowns = (props) => {

  console.log('props.correctOrNot', props.correctOrNot)
  if(props.randomStates.length === 0 && props.randomBars.length === 0) {
    return (
    <div className="loading">
      Loading...
      <img className="img" src="http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_gray_512.gif" />
    </div>);
  }

  const randomStates = props.randomStates.map(state => {
    return (
      <option 
        key={state}
        value={state}>{ state }</option>
    )
  });

  const randomBars = props.randomBars.map(bar => {
    return (
      <option 
        key={bar}
        value={bar}>{ bar }</option>
    )
  });

      return (
        <div className="row">
          <form className="dropdown">
            <h2>This is a <span className="spooky">SOOOOUPER SCARY MATCHING GAME.</span> Can you guess which candy was each state's favorite purchase in the three months leading up to Halloween?</h2>
            <label>Pick state:</label>
            <select onChange={(e) => props.handleStateSelect(e)}>
              { randomStates }
            </select>
            <label>Pick candy:</label>
            <select onChange={(e) => props.handleBarSelect(e)}>
              { randomBars }
            </select>
            <button onClick={props.checkPair}>Submit</button>
          </form>
          <div className="answer">
            {props.correctOrNot === null ? "" : props.correctOrNot !== true ? <img src={'https://sd.keepcalm-o-matic.co.uk/i-w600/try-again-because-your-wrong.jpg'} /> : <img src={'http://i.imgflip.com/1kcjv6.jpg'} />}
          </div>
        </div>
      );
}
export default Dropdowns;