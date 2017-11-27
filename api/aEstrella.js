
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

const Algoritmo = Matriz => {
    let Frontera = new Array()
    let Expandidos = new Array()
    let Chidos = new Array()
    let newMatriz = []

    const CostoTotal = nodo => nodo.gn + nodo.hn

    const VerVecinos = (i, j) => {
        let contador = 0
        let Acumulador = 0
        let bandera = true
        let Aux = {}

        for (let renglon = (i < 1 ? 1 : i) - 1; renglon < i + 2; renglon++) {
            for (let columna = (j < 1 ? 1 : j) - 1; columna < j + 2; columna++) {
                if (columna == j && renglon == i || columna >= Matriz.length || renglon >= Matriz.length
                    || !!Matriz[renglon][columna].final
                ) continue;

                if (Matriz[renglon][columna].Valor.final) {
                    return Matriz[renglon][columna];
                }

            }
            if (CostoTotal(Matriz[renglon][columna]) < CostoTotal(Aux)) {
                Aux = Matriz[renglon][columna]
            }
        }
        Ordenar(Frontera)

        if (Frontera.length > 0 && CostoTotal(Frontera[0]) > Aux) {
            Frontera.shift(Aux)
            Aux.Visitado = true
        }

        Expandidos.push(Frontera.unshift(0))
        VerVecinos(Expandidos[Expandidos.length - 1].i, Expandidos[Expandidos.length - 1].j)
    }
    // Expandidos.push(Frontera.shift());
}


const Ordenar = lista => {
    lista.sort((a, b) => {
        if (CostoTotal(a) > CostoTotal(b)) {
            return 1;
        }
        if (CostoTotal(a) < CostoTotal(b)) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
}


module.exports.verVecinos = Algoritmo

