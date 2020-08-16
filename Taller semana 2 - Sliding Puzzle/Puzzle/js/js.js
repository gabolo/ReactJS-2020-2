// JavaScript Document
class cuadro{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	
	getcuadroar(){
		if(this.y ===0)return null;
		return new cuadro(this.x, this.y - 1);
		
	}
	getcuadrode(){
		if(this.x === 3)return null;
		return new cuadro(this.x+1, this.y);
		
	}
	getcuadroab(){
		if(this.y === 3)return null;
		return new cuadro(this.x, this.y + 1);
		
	}
	getcuadroiz(){
		if(this.x ===0)return null;
		return new cuadro(this.x-1, this.y);
		
	}
	
	getsicua(){
		return[
		this.getcuadroar(),
		this.getcuadrode(),
		this.getcuadroab(),
		this.getcuadroiz()
		].filer(cuadro => cuadro != null);
		
	}

cuadroaleatorio(){
	const randomcua = this.getsicua();
	return randomcua[Math.floor(Math.random()*randomcua.length)];
}

const swapBoxes = (cuadros, box1, box2) => {
  const temp = grid[box1.y][box1.x];
  cuadros[box1.y][box1.x] = cuadros[box2.y][box2.x];
  cuadros[box2.y][box2.x] = temp;
}
	const isSolved = cuadros => {
  return (
    cuadros[0][0] === 1 &&
    cuadros[0][1] === 2 &&
    cuadros[0][2] === 3 &&
    cuadros[1][0] === 4 &&
    cuadros[1][1] === 5 &&
    cuadros[1][2] === 6 &&
    cuadros[2][0] === 7 &&
    cuadros[2][1] === 8 &&
    cuadros[2][2] === 0 &&
  );
};
	let cuadros = [[1,2,3], [4,5,6],[7,8,0]];
	
	 let vacio = new cuadro(3, 3);
	for(let i = 0; i < 1000; i++){
		
		const cuadroaleatorio = vacio.cuadroaleatorio();
	}
}
class estado{
	
	constructor(cuadros, move, estado){
		this.cuadros = cuadros;
		this.move = move;
		this.estado = estado;
	}
base(){
	return new estado([[0,0,0], [0,0,0],[0,0,0]], 0, 0, "base");
	
	
}
inicio(){
	return new State(getcuadro(), 0, 0, "jugando");
	
}
	
}