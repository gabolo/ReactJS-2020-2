var PUZZLE_SIDE = 3
var PUZZLE_WIDTH = 500
var PUZZLE_HEIGHT = 500
const PIECE_SEPARATION = 0.25
const TEXT_SIZE = 200
var puzzle;
var audio;
//var PIECE_

function isNeighbour(a,b){
  return Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]) == 1;
}

class Piece {
  constructor(width,height,top,left,number,coords,parentHtml,fontSize=100){
    this.coords = coords
    this.desiredCoords = [...coords];
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.fontSize = fontSize
    this.div = document.createElement('div')
    this.div.id = `piece-${number}`
    let text = document.createTextNode((number+1).toString())
    this.div.classList.add('piece')
    this.div.style.width = `${width-PIECE_SEPARATION*2}%`
    this.div.style.height = `${height-PIECE_SEPARATION*2}%`
    this.div.style.top = `0`
    //this.div.style.left = `${left+PIECE_SEPARATION}%`
    this.div.style.border = `${PIECE_SEPARATION}% solid black`
    this.div.style.fontSize = `${fontSize}px`
    //console.log(`-${top}%;`)
    
    
    
    
    //this.div.style = `width:${width-PIECE_SEPARATION*2}%;height:${height-PIECE_SEPARATION*2}%;top:${top+PIECE_SEPARATION}%;left:${left+PIECE_SEPARATION}%;border:${PIECE_SEPARATION}% solid black;font-size: ${fontSize}px;`
    this.div.appendChild(text)
    parentHtml.appendChild(this.div);

    const {parentwidth,parentheight,piecewidth,pieceheight} = this.computeTransform3d();
    console.log(coords)
    this.div.style.backgroundPositionX = `-${coords[1] * piecewidth}px`
    this.div.style.backgroundPositionY = `-${coords[0] * pieceheight}px`
    console.log(10000/height)
    this.div.style.backgroundSize = ` ${parentwidth}px ${parentheight}px`

    this.div.style.transform = `translate3d(${(left+PIECE_SEPARATION) * parentwidth / piecewidth}%,${(top+PIECE_SEPARATION) * parentheight / pieceheight}%,0px)`
  }

  computeTransform3d(){
    let parentwidth = parseFloat( window.getComputedStyle(this.div.parentElement)["width"]);
    let parentheight = parseFloat( window.getComputedStyle(this.div.parentElement)["height"]);

    let piecewidth = parseFloat( window.getComputedStyle(this.div)["width"]);
    let pieceheight = parseFloat( window.getComputedStyle(this.div)["height"]);
    return {parentwidth,parentheight,piecewidth,pieceheight};
  }

  moveTo(top,left,coords,updatehtml=true){
    this.top = top;
    this.left = left;
    this.coords = coords;
    //this.div.style.top = `${top+PIECE_SEPARATION}%`
    //this.div.style.left = `${left+PIECE_SEPARATION}%`

    if(updatehtml){
      const {parentwidth,parentheight,piecewidth,pieceheight} = this.computeTransform3d();

      this.div.style.transform = `translate3d(${(left+PIECE_SEPARATION) * parentwidth / piecewidth}%,${(top+PIECE_SEPARATION) * parentheight / pieceheight}%,0px)`
      
    }
    //console.log('moving')
    //this.div.style = `width:${this.width-PIECE_SEPARATION*2}%;height:${this.height-PIECE_SEPARATION*2}%;top:${top+PIECE_SEPARATION}%;left:${left+PIECE_SEPARATION}%;border:${PIECE_SEPARATION}% solid black;font-size: ${this.fontSize}px;`
  }

  updateHtml(){
    const {parentwidth,parentheight,piecewidth,pieceheight} = this.computeTransform3d();

    this.div.style.transform = `translate3d(${(this.left+PIECE_SEPARATION) * parentwidth / piecewidth}%,${(this.top+PIECE_SEPARATION) * parentheight / pieceheight}%,0px)`
    
  }

  isInRightPosition(){
    return this.coords[0] === this.desiredCoords[0] && this.coords[1] === this.desiredCoords[1];
  }

}

class Puzzle{
  constructor (sidesX,sidesY){
    this.sidesX = sidesX; // cols
    this.sidesY = sidesY  // rows
    this.html = document.getElementById('puzzle');
    //this.html.style = `font-size:${TEXT_SIZE/Math.max(sidesX,sidesY)}`
    this.movementBlocked = false; // avoid moving blocks
    this.pieces = []; // class Piece objects
    this.empty = [sidesY-1,sidesX-1]; // ubicacion del hueco del puzzle
    this.positions = [] // where is every piece
    this.scrambling = false; // autoexplicativo

    let pieceWidth = 100/sidesX
    let pieceHeight = 100/sidesY
    for(let i = 0; i < sidesY; ++i){
      //this.pieces.push([])
      this.positions.push([]);
      for(let j = 0; j < sidesX; ++j){
        if (i == sidesY-1 && j == sidesX-1){ 
          this.positions[i].push(-1);
          continue;
        }
        let ubi = i*sidesX+j
        this.pieces.push(new Piece(pieceWidth,pieceHeight,i*(pieceHeight),j*(pieceWidth),ubi,[i,j],this.html,TEXT_SIZE/Math.max(sidesX,sidesY)));
        this.positions[i].push(ubi);
      }
    }
    //this._handleClick.bind(this)
    this.html.onclick = this._handleClick;
    
  }

  move(i,coords,origin,animated = false){
    if (!this.movementBlocked || (origin == 'scramble')){
      this.setBlock(true);
      let top = (100/this.sidesY)*this.empty[0]
      let left = (100/this.sidesX)*this.empty[1]
      let oldPos = this.pieces[i].coords;
      this.positions[oldPos[0]][oldPos[1]] = -1;
      this.positions[this.empty[0]][this.empty[1]] = i;
      this.pieces[i].moveTo(top,left,coords,!this.scrambling);
      this.empty = oldPos;
      if(!this.scrambling && this.isSolved()){
        this.win();
      }
      this.setBlock(false);
    }
  }

  setBlock(block){
    this.movementBlocked = block;
  }

  _handleClick = (ev)=> {
    let target = ev.target.closest('.piece')
      if(target && !this.movementBlocked) {
        let ubi = ev.target.id.split('-')[1];
        
        let coords = this.pieces[ubi].coords;
        if (isNeighbour(coords, this.empty)){
          
          this.move(ubi,this.empty)
          
        }
      }
      
  }

  isInside = (coords) => {
    return coords[0] >= 0 && coords[0] < this.sidesY && coords[1] >= 0 && coords[1] < this.sidesX;
  }

  scramble  ()  {
    this.scrambling = true;
    let perm = 0;
    /*
    setTimeout(()=>{
      let interval = setInterval(()=>{
        ++perm;
        let ran = Math.random();
        let movingTo = [this.empty[0],this.empty[1]];
        let possibilities = [[this.empty[0]+1, this.empty[1]],[this.empty[0]-1, this.empty[1]],[this.empty[0], this.empty[1]+1],[this.empty[0], this.empty[1]-1],]
        possibilities = possibilities.filter((el)=>{
          return this.isInside(el);
        })
        console.log(possibilities.length)
        movingTo = possibilities[Math.floor(possibilities.length * ran)];
        // if (ran < 0.25){
        //   movingTo[0]--;
        // }else if (ran < 0.5){
        //   movingTo[0]++;
        // }else if (ran < 0.75){
        //   movingTo[1]--;
        // }else {
        //   movingTo[1]++;
        // }
        if (this.isInside(movingTo)){
          let movy = movingTo[0];
          let movx = movingTo[1];
          this.move(this.positions[movy][movx],this.empty,'scramble')
        }
        if(perm == 500){
          clearInterval(interval)
          this.scrambling = false;
        }
      },10)
    },1)
    */
    
    for (let i = 0; i < 5000;++i){
      let ran = Math.random();
      let movingTo = [this.empty[0],this.empty[1]];
      if (ran < 0.25){
        movingTo[0]--;
      }else if (ran < 0.5){
        movingTo[0]++;
      }else if (ran < 0.75){
        movingTo[1]--;
      }else {
        movingTo[1]++;
      }
      if (this.isInside(movingTo)){
        let movy = movingTo[0];
        let movx = movingTo[1];
        this.move(this.positions[movy][movx],this.empty,'scramble')
      }
    }

    this.scrambling = false;
    for (let piece of this.pieces){
      piece.updateHtml();
    }
  }

  _handleKeyboard  (dx,dy){
    let origin = [this.empty[0] + dy, this.empty[1] + dx];
    if (!this.isInside(origin)) return;
    let pieceToMove = this.positions[origin[0]][origin[1]];
    this.move(pieceToMove,this.empty)
  }

  isSolved(){
    for(let piece of this.pieces){
      if(!piece.isInRightPosition()) return false;
    }
    return true;
  }

  win(){
    audio.play();
    document.getElementById('modal2').style.display='block'
    //alert('Ganaste!')
    this.setBlock(true);
  }

}

var listener;

function setupGame(){
  let rows = document.getElementById('rows').value
  let cols = document.getElementById('cols').value
  if(!rows || !cols){
    alert('Elija un valor para ambas dimensiones')
    return true;
  }
  if (rows > 20 || rows < 3 || cols > 20 || cols < 3){
    alert('Las dimensiones deben estar entre 3 y 20');
    return true;
  }
  if (puzzle){
    window.removeEventListener('keydown',listener);
    let pieceshtml = document.getElementsByClassName('piece');
    while(pieceshtml[0]){
      puzzle.html.removeChild(pieceshtml[0])
    }
    // document.getElementsByClassName('piece').forEach((piece)=>{
    //   puzzle.html.removeChild(piece);
    // })

  }
  puzzle = new Puzzle(cols,rows);
  puzzle.setBlock(true)
  puzzle.scramble();
  puzzle.setBlock(false)

  listener = (e)=>{
    if (e.defaultPrevented) return;

    switch(e.key){
      case 'ArrowUp':
      case 'w':
      case 'W':
        puzzle._handleKeyboard(0,-1);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        puzzle._handleKeyboard(0,1);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        puzzle._handleKeyboard(-1,0);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        puzzle._handleKeyboard(1,0);
        break;
      default:
        return;
    }

    e.preventDefault();
  }

  window.addEventListener('keydown', listener)
}

function closeModal(){
  let modal= document.getElementById('modal1')
  modal.style.display='none'
}

function closeModal2(){
  let modal= document.getElementById('modal2')
  modal.style.display='none'
}


window.onload = ()=>{
  audio = new Audio('./win.mp3')
  
}
