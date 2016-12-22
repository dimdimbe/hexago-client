import Stockage from './Stockage';

class GameState extends Stockage{

  constructor(){
    super({
      state : {
        hexagons : []
      },
      options : {
        storage : 'Hexago'
      }
    });
  }

  clickOnHexagon(state,row,col){
    state.hexagons.map( hexagon => {
      if(hexagon.col === col && hexagon.row === row){
        hexagon.c = 'ff0000'
      }
      return hexagon
    })
    return state
  }

  init(state,nbHexagon){
    state.hexagons = []
    for(let col = 0; col < nbHexagon; col++){
      for(let row = 0; row < nbHexagon; row++){
        state.hexagons.push({
          col,row,
          c : false
        })
      }
    }
    return state
  }

}

let gameState = new GameState();
export default gameState;
