import React, { Component } from 'react';

const Dropdowns = (props) => {
  console.log("props", props);

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
            <select>
              { randomStates }
            </select>
            <select>
              { randomBars }
            </select>
            <button>Submit</button>
          </form>
        </div>
      );
}
export default Dropdowns;