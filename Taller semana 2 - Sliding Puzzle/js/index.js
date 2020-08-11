window.onload = () => {

    document.getElementById("imgIn").addEventListener("change", () => {
        const file = document.getElementById("imgIn").files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            document.getElementById('img').style.backgroundImage = "url(" + reader.result + ")";
            init(reader.result);
            document.getElementById('imgIn').remove();
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    });
}
const init = (img) => {
    clean();
    let dimen = NaN;
    do {
        dimen = parseInt(prompt("enter a positive integer for the dimensions ex: 3"));
    } while (isNaN(dimen));
    let elements = [];
    let matrix = [];
    for (let i = 0; i < dimen; i++) {
        matrix[i] = new Array(dimen);
        for (let j = 0; j < dimen; j++) { matrix[i][j] = { "id": 0, "obj": null }; }
    }
    let count = 1;
    for (let i = 0; i < dimen; i++) {
        for (let j = 0; j < dimen; j++) {
            let div = document.createElement("div");
            div.setAttribute("style", `background: url(${img});background-size: ${dimen * 100}% ${dimen * 100}%;background-position-x:${(100 / (dimen - 1)) * j}%;background-position-y:${(100 / (dimen - 1)) * i}%;display:inline-block;width:${100 / dimen - 0.3}%;height:${100 / dimen - 0.3}%;border:1px solid white`)
            div.id = count;
	    div.className = "card"; 
            elements.push(div)
            ++count;
        }
    }
    elements.pop();
    let possible = NaN;
    do {
        possible = parseInt(prompt("enter 1 for a possible game or 2 for a probably impossible one"));
    } while (isNaN(dimen));
    let unOrderElements
    if (possible == 1) {
        unOrderElements = [...elements];
        unOrderElements.push.apply(unOrderElements, unOrderElements.splice(0, Math.random() * (dimen * dimen - 2) + 2));
    } else {
        unOrderElements = elements.sort(() => Math.random() - 0.5); //it may be impossible looking for a mess algorithm
    }
    let blankDiv = document.createElement("blankDiv");
    blankDiv.setAttribute("style", `display:inline-block;width:${100 / dimen - 0.3}%;height:${100 / dimen - 0.3}%;border:1px solid white`)
    blankDiv.id = dimen * dimen;
    unOrderElements.push(blankDiv);


    let col = 0;
    let row = 0;
    unOrderElements.forEach(ele => {
        if (col >= dimen) {
            ++row;
            col = 0;
        }
        matrix[row][col]["id"] = ele.id;
        matrix[row][col]["obj"] = ele;
        ele.setAttribute("row", row);
        ele.setAttribute("col", col);
        ++col;
    });

    unOrderElements.forEach(ele => { document.getElementById("conteiner").appendChild(ele); });
    let moves = 0;
    document.getElementById("conteiner").addEventListener('click', (ev) => {
	if (event.target.className=='card') {
            let actRow = parseInt(ev.target.getAttribute("row"));
            let actCol = parseInt(ev.target.getAttribute("col"));

            if (validMove(actRow, actCol, dimen, matrix)) {
                ++moves;
                document.getElementById("moves").innerHTML = moves;
                clean();
                reDraw(matrix);
                setTimeout(() => { chekWin(matrix) }, 0);
            }
        }
    });

}
const clean = () => { document.getElementById("conteiner").querySelectorAll('*').forEach(n => n.remove()); };
const reDraw = (matrix) => {
    for (const rowi in matrix) {
        for (const coli in matrix[rowi]) {
            document.getElementById("conteiner").appendChild(matrix[rowi][coli]["obj"]);
        }
    }
}
const chekWin = (matrix) => {
    let counter = 1;
    loop1:
    for (const rowi in matrix) {
        loop2:
        for (const coli in matrix[rowi]) {
            if (matrix[rowi][coli]["id"] != counter) {
                break loop1;
            }
            ++counter;
        }
    }
    --counter;
    if (counter == matrix.length * matrix.length) {
        alert("you win");
    }
}
const validMove = (row, col, dimension, matrix) => {

    let actu = { ...matrix[row][col] };
    if (col < dimension - 1) {
        if (matrix[row][col + 1]["id"] == dimension * dimension) {
            let der = { ...matrix[row][col + 1] };
            matrix[row][col] = der;
            matrix[row][col]["obj"].setAttribute("col", col);
            matrix[row][col + 1] = actu;
            matrix[row][col + 1]["obj"].setAttribute("col", col + 1);
            return true;
        }
    }
    if (col > 0) {
        if (matrix[row][col - 1]["id"] == dimension * dimension) {
            let izq = { ...matrix[row][col - 1] };
            matrix[row][col] = izq;
            matrix[row][col]["obj"].setAttribute("col", col);
            matrix[row][col - 1] = actu;
            matrix[row][col - 1]["obj"].setAttribute("col", col - 1);
            return true;
        }
    }
    if (row < dimension - 1) {
        if (matrix[row + 1][col]["id"] == dimension * dimension) {
            let abajo = { ...matrix[row + 1][col] };
            matrix[row][col] = abajo;
            matrix[row][col]["obj"].setAttribute("row", row);
            matrix[row + 1][col] = actu;
            matrix[row + 1][col]["obj"].setAttribute("row", row + 1);

            return true;
        }
    }
    if (row > 0) {
        if (matrix[row - 1][col]["id"] == dimension * dimension) {
            let arrib = { ...matrix[row - 1][col] };
            matrix[row][col] = arrib;
            matrix[row][col]["obj"].setAttribute("row", row);
            matrix[row - 1][col] = actu;
            matrix[row - 1][col]["obj"].setAttribute("row", row - 1);
            return true;
        }
    }
}