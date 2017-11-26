console.log("Holi crayoli");

var Frontera = new Array();
var Expandidos = new Array();
var Chidos = new Array();

var Matriz = [
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, -1, 2],
    [2, 2, 2, 2, 2, 2],
    [1, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
];
async function Main() {

    var Res = await getCoordenadasObjetivo(Matriz);
    var Inicio = Res.Inicio;
    var Final = Res.Final;

    console.log(Res);

    //dibujarMatriz(Matriz);

    //var x = verVecinos(Matriz, 1, 1);

    var MatrizModificada = AsignarCostos(Matriz, Final);

    setTimeout(() => {
        dibujarMatriz(MatrizModificada);
        verVecinos(MatrizModificada, Inicio.i, Inicio.j);
        console.log(Frontera);
        Chidos.forEach(function(element) {
            let timpx = document.getElementById("Elemento_" + element.i + "-" + element.j);
            timpx.style.backgroundColor = "yellow";
        }, this);
    }, 200);

    console.log(MatrizModificada);
};

Main();
function verVecinos(Matriz, i, j) {
    var contador = 0;
    var Acumulador = 0;
    var bandera = true;

    for (var renglon = (i < 1 ? 1 : i) - 1; renglon < i + 2; renglon++) {
        //console.warn("renglon: ", renglon);
        for (var columna = (j < 1 ? 1 : j) - 1; columna < j + 2; columna++) {
            console.log(renglon, columna, "<>");
            if (columna == j && renglon == i || columna >= Matriz.length || renglon >= Matriz.length 
                || Matriz[renglon][columna].Valor == 1 || Matriz[renglon][columna].Valor == 0
                )
                    continue;
                
            if (Matriz[renglon][columna].Valor == -1) {
                //console.warn("*****", Matriz[renglon][columna]);
                return Matriz[renglon][columna];
            }
            if (bandera) {
                Acumulador = Matriz[renglon][columna].Valor + 1;
                //console.log("Primera iteracion: ", Acumulador, Matriz[renglon][columna].Valor);
                bandera = false;
            }
            //console.warn("Column: ", columna);
            let timp = document.getElementById("Elemento_" + renglon + "-" + columna);
            timp.style.backgroundColor = "#00bcd4";

            Matriz[renglon][columna].Visitado = false;
            if (!Chidos.find(x => x.i == renglon && x.j == columna)){
                Frontera.push(Matriz[renglon][columna]);
            }


            //console.log("A VER: ", Acumulador, Matriz[renglon][columna].Valor, Frontera);
            // console.log(columna, (renglon + "," + columna), timp);
            contador++;
        }
        Frontera.sort((a, b) => {
            if (a.gDeN > b.gDeN) {
                return 1;
            }
            if (a.gDeN < b.gDeN) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    }
    Expandidos.push(Frontera.shift());
    console.log(Frontera);
    console.log("Expandidos :", Expandidos);

    if (Expandidos.length > 0) {
        var tempato = Expandidos.shift();
        Chidos.push(tempato);
        let timpx = document.getElementById("Elemento_" + tempato.i + "-" + tempato.j);
        timpx.style.backgroundColor = "yellow";
        verVecinos(Matriz, tempato.i, tempato.j);
    }
    //console.info(contador);
}
function verEnX(Matriz, x, renglones) {
    var contador = 0;

}
function verEnY(y, columnas) {

}

// function AsignarCostos(Matriz, Final) {

//     var fin = Final;
//     var nuevaMatriz = [[]];

//     Matriz.forEach((element, i) => {
//         nuevaMatriz[i] = new Array();
//         element.forEach((nuevoElem, j) => {
//             nuevaMatriz[i][j] = {};
//             let nuevoElemento = {
//                 gDeN: Math.abs(fin.i - i) + Math.abs(fin.j - j),
//                 Valor: Matriz[i][j],
//                 i: i,
//                 j: j
//             };
//             nuevaMatriz[i][j] = (nuevoElemento);
//         }, this);
//     }, this);

//     return nuevaMatriz;
// };

// function getCoordenadasObjetivo(Matriz) {
//     var result = {};
//     Matriz.forEach((element, i) => {
//         element.forEach((subElement, j) => {
//             if (String(subElement) == "-1") {
//                 result.
//                     Final = {
//                         "i": i, "j": j
//                     }
//             }
//             if (String(subElement) == "1") {
//                 result.
//                     Inicio = {
//                         "i": i, "j": j
//                     }
//             }
//         }, this);
//     }, this);
//     return result;
// };
function dibujarMatriz(Matriz) {

    var tab = document.getElementById("tabla");

    Matriz.forEach((element, i) => {

        var nuevoElemento = document.createElement("tr");
        nuevoElemento.setAttribute("Id", "Row_" + i);
        tab.appendChild(nuevoElemento);

        element.forEach((subnuevoElemento, j) => {
            var nuevoSubElemento = document.createElement("td")
            nuevoSubElemento.setAttribute("Id", "Elemento_" + i + "-" + j);
            nuevoElemento.appendChild(nuevoSubElemento);
            nuevoSubElemento.style.backgroundColor = getColor(subnuevoElemento.Valor);
            nuevoSubElemento.textContent = (subnuevoElemento.gDeN);
        }, this);
    }, this);

}

function getColor(valor) {
    switch (valor) {
        case 1:
            return "#FF0000";
        case 2:
            return "#ededed";
        case 0:
            return "#000";
        case -1:
            return "#00FF00";
        default:
            return "#ededed";
    }
}