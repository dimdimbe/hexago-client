import React, { Component } from 'react';
import Hexagon from './Hexagon/Hexagon';
import GameState from './Store/GameState';

const nbHexagon = 10;
const size = 50;

class App extends Component {

  constructor(props){
    super(props);

    this.state = GameState.subscribe(this,'setState');

  }

  componentWillMount(){
    if(!this.state.hexagons.length) GameState.action('init')(nbHexagon)
  }

  render() {
    let grid = this.state.hexagons.map(data => <Hexagon key={data.col+'-'+data.row} size={size} row={data.row} col={data.col} color={data.c}/> )

    return (
      <div>
      {grid}
      </div>
    );
  }
}



export default App;
