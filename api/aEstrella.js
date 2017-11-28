
exports.AsignarCostos = (Matriz, Inicio, Final) => {
    let fin = Final;
    let nuevaMatriz = [[]];
    let id = 1
    Matriz.forEach((element, i) => {
        nuevaMatriz[i] = new Array();
        element.forEach((nuevoElem, j) => {
            nuevaMatriz[i][j] = {};
            let nuevoElemento = {
                hn: Math.abs(fin.i - i) + Math.abs(fin.j - j),
                Valor: Matriz[i][j],
                gn: Matriz[i][j],
                i: i,
                j: j,
                Id: id++
            };
            nuevoElemento.Costo = nuevoElemento.gn + nuevoElemento.hn
            nuevaMatriz[i][j] = (nuevoElemento);
        }, this);
    }, this);

    nuevaMatriz[Inicio.i][Inicio.j].Inicio = true
    nuevaMatriz[Final.i][Final.j].Final = true

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

const CostoTotal = nodo => nodo ? nodo.gn + nodo.hn : 1000

const Algoritmo = (Matriz, inicio, fin) => {
    let Frontera = new Array()
    let Expandidos = new Array()
    let Chidos = new Array()
    let newMatriz = []

    let bandera = true
    let contador = 0
    let Acumulador = 0

    const VerVecinos = (i, j) => {
        let Aux = {}
        console.log(++contador)
        for (let renglon = (i < 1 ? 1 : i) - 1; renglon < i + 2; renglon++) {
            for (let columna = (j < 1 ? 1 : j) - 1; columna < j + 2; columna++) {

                if (columna == j && renglon == i || columna >= Matriz.length || renglon >= Matriz.length
                    || Matriz[renglon][columna].Inicio || !!Matriz[renglon][columna].Visitado
                ) continue;

                if (Matriz[renglon][columna].Final){
                    bandera = false
                    Aux = Matriz[renglon][columna]
                }

                Frontera.push(Matriz[renglon][columna])
            }
        }
        Ordenar(Frontera)

        let expandido = Frontera.shift()
        bandera ? expandido.Visitado = true : ""
        Acumulador += expandido.Costo
        bandera ? Expandidos.push( expandido ) : Expandidos.push(Aux)

        bandera ? VerVecinos(Expandidos[Expandidos.length - 1].i, Expandidos[Expandidos.length - 1].j) : ""
    }
    VerVecinos(inicio.i, inicio.j)

    return {
        Matriz: Matriz,
        Frontera: Frontera,
        Expandidos: Expandidos,
        Acumulador: Acumulador
    }
}

const Ordenar = lista => {
    lista.sort((a, b) => {
        if (a.Costo == b.Costo && a.hn > b.hn) return 1
        if (a.Costo == b.Costo && a.hn < b.hn) return -1
        if (a.Costo > b.Costo) return 1;
        if (a.Costo < b.Costo) return -1;
        return 0;
    })
}
const RandomArray = (size, min, max) => {
    let Arreglo = []

    for (let i = 0; i < size; i++) {
        Arreglo.push(getRandomInt(min, max))
    }
    return Arreglo
}
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}
const RandomMatrix = (size, min, max) => {
    let Matrix = []

    for (let i = 0; i < size; i++) {
        Matrix.push(RandomArray(size, min, max))
    }
    return Matrix
}
const getRandomTargets = size => { return { i: getRandomInt(0, size), j: getRandomInt(0, size) } }

module.exports.getRandomTargets = getRandomTargets
module.exports.RandomMatrix = RandomMatrix
module.exports.verVecinos = Algoritmo

