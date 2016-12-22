import React, { Component } from 'react';
import './Hexagon.css';
import GameState from '../Store/GameState'

const COLOR = 'A3C4BC'

class Hexagon extends Component {

  constructor(props){
    super(props);
    this.state = {
      hover : false
    }
  }

  calculCSS(){
    let {row,col,size} = this.props;


    const HEXAGON_WIDTH = size || 50;
    const HEXAGON_HALF_WIDTH = HEXAGON_WIDTH / 2;

    const HEXAGON_HEIGHT = HEXAGON_WIDTH*.6;
    const HEXAGON_PEAK_HEIGHT = HEXAGON_HEIGHT / 2;
    const BORDER_SIZE = 4;

    let top = row*(HEXAGON_HEIGHT+HEXAGON_PEAK_HEIGHT+BORDER_SIZE);
    let left = col*(HEXAGON_WIDTH+BORDER_SIZE) - ((row%2) * (HEXAGON_HALF_WIDTH + (BORDER_SIZE/2)));

    let color = this.state.hover?ColorLuminance(this.props.color||COLOR,-0.25):this.props.color || COLOR


    return {

      before : {
        'top': (-HEXAGON_PEAK_HEIGHT)+'px',
        'borderBottom': HEXAGON_PEAK_HEIGHT+'px solid #'+color,
        'borderLeft': HEXAGON_HALF_WIDTH+'px solid transparent',
        'borderRight': HEXAGON_HALF_WIDTH+'px solid transparent'
      },

      hexagon : {
        'position': 'absolute',
        'top':top+'px',
        'left':left+'px',
        'height': HEXAGON_HEIGHT+'px',
        'marginBottom': HEXAGON_PEAK_HEIGHT+'px',
        'marginTop': HEXAGON_PEAK_HEIGHT+'px',
        'width': HEXAGON_WIDTH+'px',
        'backgroundColor' : '#'+color
      },

      after : {
        'borderLeft': HEXAGON_HALF_WIDTH+'px solid transparent',
        'borderRight': HEXAGON_HALF_WIDTH+'px solid transparent',
        'borderTop': HEXAGON_PEAK_HEIGHT+'px solid #'+color,
        'bottom': (-HEXAGON_PEAK_HEIGHT)+'px'
      }

    }
  }

  mouseEnter() {
    let state = {...this.state}
    state.hover = true;
    this.setState(state);
  }

  mouseExit() {
    let state = {...this.state}
    state.hover = false;
    this.setState(state);
  }

  mouseClick(){
    this.setColor('ff0000')
  }

  render() {

    let {col,row} = this.props

    const style = this.calculCSS();

    return (
      <div className="hexagon" style={style.hexagon}
        onMouseEnter={this.mouseEnter.bind(this)}
        onMouseLeave={this.mouseExit.bind(this)}
        onClick={GameState.action('clickOnHexagon').bind(null,row,col)}
      >
        <div className="hexagon_before" style={style.before}></div>
        <div className="hexagon_after" style={style.after}></div>
      </div>
    );
  }
}

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

export default Hexagon;
