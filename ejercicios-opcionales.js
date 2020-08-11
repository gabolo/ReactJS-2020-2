function recursiveFibonacci(n) {
    if (n < 0) {
        return "ERROR: Entrada negativa (Solo entradas positivas aceptadas)";
    }
    if (n == 0 || n == 1) {
        return 1;
    }

    return recursiveFibonacci(n - 2) + recursiveFibonacci(n - 1);
}

console.log("Fibonacci: \n" + recursiveFibonacci(4) + "\n");

function sqrRoot(num) {
    if (num < 0) {
        return "ERROR: Entrada negativa (Solo entradas positivas aceptadas)";
    }

    // No es lindo... pero funciona.
    // Trunc corta los decimales y una raiz cuadrada es el el numero a la potencia de 1/2
    return Math.trunc(Math.pow(num, 0.5));
}

console.log("Menor raiz posible:\n" + sqrRoot(30) + "\n");

function allCaps(message) {
    const messageUpper = message.toUpperCase();
    const arrayUpper = Array.from(messageUpper);
    return arrayUpper;
}

console.log("allCaps:\n" + allCaps("hola mundo"));
