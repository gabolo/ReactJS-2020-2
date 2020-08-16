 function fib(num){
    const arreglo=[0, 1];

    for(let i=2; i<=num ;i++) {
        let a=arreglo[i-1];
        let b=arreglo[i-2];
        arreglo.push(a+b);
    }

    return arreglo[num];
 }

var sqrtRoot = num =>{
    if(num<0){
        return "El numero no puede ser negativo"
    }else if(num==0){
        return 0;
    }else{
    var x = 0;
    while(x*x<=num){
        x+=0.0001;
    }
    return Math.round(x);
}
}

var allCaps = text =>{
    var array=[];
    for(var i=0;i<text.length;i++){
        var letra=text[i];
        array[i]=letra;
    }
    var result = array.map((letra)=>{return letra.toUpperCase()});
    return result;
};


