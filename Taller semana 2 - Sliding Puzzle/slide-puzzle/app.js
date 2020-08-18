const one = document.querySelector(".piece1");
const two = document.querySelector(".piece2");
const three = document.querySelector(".piece3");
const four = document.querySelector(".piece4");
const five = document.querySelector(".piece5");
const six = document.querySelector(".piece6");
const sev = document.querySelector(".piece7");
const eight = document.querySelector(".piece8");
const nine = document.querySelector(".piece9");
const fullArray=[one,two,three,four,five,six,sev,eight,nine];
const tempArray=[one,two,three,four,five,six,sev,eight,nine];
const rows = document.querySelectorAll("tr");
var gameInProgess = false;



document.querySelector("#start").addEventListener("click", function(e){
    startGame();
  
});

function startGame(){ 
   
    if(!gameInProgess){
        try {
            let rndNum = Math.floor(Math.random()*9 +1 );
            tempArray[rndNum-1].classList.remove("piece"+rndNum);
            gameInProgess= !gameInProgess;
        } catch (error) {
            console.log(rndNum);
        }
       
    }
    
    restoreShuffle();
    



}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function restoreShuffle(){

    shuffleArray(tempArray);
   
        for(let j = 0; j<3;j++){
            rows[j].append(tempArray[3*j]);
            rows[j].append(tempArray[3*j+1]);
            rows[j].append(tempArray[3*j+2]);
        }
    
}
 function isClose(element){
        let index = returnArrayIndex(element);
        let blank = blankBlockIndex();
        switch (index){
            case 2:
                if (index -1   === blank|| index -3   === blank|| index +3   === blank) {
                    return true;
                }
                
                return false;
                break;
            case 3:
                if (index +1 === blank || index -3   === blank|| index +3   === blank) {
                    return true;
                }
                
                return false;
                    break;
            case 5:
                if (index -1   === blank|| index -3   === blank|| index +3   === blank) {
                    return true;
                }
                
                return false;
                break;
            case 6:
                if (index +1 === blank ||  index -3   === blank|| index +3   === blank) {
                    return true;
                }
                
                return false;
                    break;
         default:
            if (index +1 === blank || index -1   === blank|| index -3   === blank|| index +3   === blank) {
                return true;
            }
            
            return false;
                break; 
                
        }
       
}

function returnArrayIndex(element){
    for (let index = 0; index < tempArray.length; index++) {
       if (element === tempArray[index]) {
           return index;
       }
    }
    return null;
}

function blankBlockIndex(){
    let blocks = document.querySelectorAll(".puzzle-piece");

    for (let index = 0; index < blocks.length; index++) {
    
        if (blocks[index].classList.length < 2) {
            return index;
        }
        
    }
    return null;
}


document.querySelector("table").onclick = function(event) {
    let target = event.target; // where was the click?
    let pressedClass = target.classList[1];
    if (isClose(target)){
       tempArray[blankBlockIndex()].classList.add(pressedClass);
       target.classList.remove(pressedClass);
       if( checkGame()){
           alert("Ganaste!!!!");
       }
    } return; // not on TD? Then we're not interested
  
    
  };

  function checkGame(){
      let lifes = 2;
      for (let index = 0; index < fullArray.length; index++) {
          if (fullArray[index]!=tempArray[index]) {
              lifes--;
              if(lifes < 1 ){
                  console.log("game is not over");
                  return false;
              }
          }
          
      }
      console.log("game is over");
                  return true;
  }