
exports.AsignarCostos = (Matriz, Final) => {

    let fin = Final;
    let nuevaMatriz = [[]];

    Matriz.forEach((element, i) => {
        nuevaMatriz[i] = new Array();
        element.forEach((nuevoElem, j) => {
            nuevaMatriz[i][j] = {};
            let nuevoElemento = {
                hn: Math.abs(fin.i - i) + Math.abs(fin.j - j),
                Valor: Matriz[i][j],
                gn: Matriz[i][j],
                i: i,
                j: j
            };
            nuevaMatriz[i][j] = (nuevoElemento);
        }, this);
    }, this);

    return nuevaMatriz;
};

exports.getCoordenadasObjetivo = (Matriz) => {
    let result = {};
    Matriz.forEach((element, i) => {
        element.forEach((subElement, j) => {
            if (String(subElement) == "-1") {
                result.
                    Final = {
                        "i": i, "j": j
                    }
            }
            if (String(subElement) == "1") {
                result.
                    Inicio = {
                        "i": i, "j": j
                    }
            }
        }, this);
    }, this);
    return result;
};

let Frontera = new Array();
let Expandidos = new Array();
let Chidos = new Array();

const verVecinos = (Matriz, i, j) => {
    let contador = 0;
    let Acumulador = 0;
    let bandera = true;

    for (let renglon = (i < 1 ? 1 : i) - 1; renglon < i + 2; renglon++) {
        for (let columna = (j < 1 ? 1 : j) - 1; columna < j + 2; columna++) {
            if (columna == j && renglon == i || columna >= Matriz.length || renglon >= Matriz.length
                || Matriz[renglon][columna].Valor == 1 || Matriz[renglon][columna].Valor == 0
            ) continue;

            if (Matriz[renglon][columna].Valor == -1) {
                return Matriz[renglon][columna];
            }
            if (bandera) {
                Acumulador = Matriz[renglon][columna].Valor + 1;
                bandera = false;
            }

            //Matriz[renglon][columna].Visitado = false;
            if (!Chidos.find(x => x.i == renglon && x.j == columna)) {
                Frontera.push(Matriz[renglon][columna]);
            }
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

    if (Expandidos.length > 0) {
        let tempato = Expandidos.shift();
        tempato.Visitado = true;
        Chidos.push(tempato);
        verVecinos(Matriz, tempato.i, tempato.j);
    }

    let matrix = Array.from(Chidos);
    matrix.push(Expandidos.map(data => {
        return !ListContainsObject(data, matrix)
    })
    )
    return {
        "Frontera": Frontera,
        "Expandidos": Expandidos,
        "Chidos": Chidos,
        "Matriz": matrix
    }
}

module.exports.verVecinos = verVecinos

const objectsAreSame = (x, y) => {
    let objectsAreSame = true;
    for (let propertyName in x) {
        if (x[propertyName] !== y[propertyName]) {
            objectsAreSame = false;
            break;
        }
    }
    return objectsAreSame;
}
const ListContainsObject = (a, b) => {
    let result;
    b.forEach(val =>{
        result = objectsAreSame(a, val) ? a : ""
    });
    return result !== "" ? result : {} ;
}