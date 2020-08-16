function swapTiles(celd1,celd2) {
  var temp = document.getElementById(celd1).className;
  document.getElementById(celd1).className = document.getElementById(celd2).className;
  document.getElementById(celd2).className = temp;
}

function clic(r,c) {
  var cell = document.getElementById("celd"+r+c);
  var tile = cell.className;
  if (tile!="hat9") {
       //Checking if white tile on the right
       if (c<3) {
         if ( document.getElementById("celd"+r+(c+1)).className=="hat9") {
           swapTiles("celd"+r+c,"celd"+r+(c+1));
           return;
         }
       }
       //Checking if white tile on the left
       if (c>1) {
         if ( document.getElementById("celd"+r+(c-1)).className=="hat9") {
           swapTiles("celd"+r+c,"celd"+r+(c-1));
           return;
         }
       }
         //Checking if white tile is above
       if (r>1) {
         if ( document.getElementById("celd"+(r-1)+c).className=="hat9") {
           swapTiles("celd"+r+c,"celd"+(r-1)+c);
           return;
         }
       }
       //Checking if white tile is below
       if (r<3) {
         if ( document.getElementById("celd"+(r+1)+c).className=="hat9") {
           swapTiles("celd"+r+c,"celd"+(r+1)+c);
           return;
         }
       }
  }

}


function change() {
for (var r=1;r<=3;r++) { 
  for (var c=1;c<=3;c++) {
    var r2=Math.floor(Math.random()*3 + 1);
    var c2=Math.floor(Math.random()*3 + 1);
  
    swapTiles("celd"+r+c,"celd"+r2+c2);
  }
}
}
