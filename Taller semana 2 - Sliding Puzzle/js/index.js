
var g = [0,1,2,3,4,5,6,7,8];
var l = [];

var n = 0;
while(n<9){
	escogerf = Math.floor(Math.random()*(g.length));
	
	let veri = escogerf;
	let r = g[escogerf];
	console.log(g);

	if(r!=-1) {
		l.push(r);
		g[escogerf] = -1;
		n+=1;
	}

}

function dibujar() {
	for(i=0;i<9;i++) {
		document.getElementById(i).innerHTML = '<img id=a'+l[i]+ ' src=./img/'+l[i]+'.jpg>';
	}
	gano();

}

function revisar(event){
	console.log(event.path[0].id);
	console.log(event.path[1].id);
	let postd= event.path[1].id;
	let posimg= event.path[0].id;
	let ver= document.getElementById("a8").parentNode.id;
	console.log(ver);
	let posx=postd%3;
	let posy=Math.floor(postd/3);

	let posxb=ver%3;
	let posyb=Math.floor(ver/3);
	if((Math.abs(posx-posxb)==0 && Math.abs(posy-posyb)==1 )|| 
	   (Math.abs(posx-posxb)==1 && Math.abs(posy-posyb)==0 )) {
		t = l[postd];
		l[postd] = l[ver];
		l[ver] = t;
		dibujar();
	}


}	

function gano() {
	var a = 1;
	for(i=0;i<9;i++) {
		if(l[i]!=i) {a = 0;}
	}
	if(a==1) {alert('Habeis ganado eres muy bueno!');}
}

dibujar();
