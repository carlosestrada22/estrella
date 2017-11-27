
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

        let Aux = []
        console.log(++contador)
        for (let renglon = (i < 1 ? 1 : i) - 1; renglon < i + 2; renglon++) {
            for (let columna = (j < 1 ? 1 : j) - 1; columna < j + 2; columna++) {

                if (columna == j && renglon == i || columna >= Matriz.length || renglon >= Matriz.length
                    || Matriz[renglon][columna].Inicio || !!Matriz[renglon][columna].Visitado
                ) continue;

                Matriz[renglon][columna].Final ? bandera = false : ""                

                Frontera.push(Matriz[renglon][columna])
            }
        }
        Ordenar(Frontera)

        let expandido = Frontera.shift()
        bandera ? expandido.Visitado = true : ""
        Acumulador += expandido.Costo
        Expandidos.push(expandido)
        
        bandera ? VerVecinos(Expandidos[Expandidos.length - 1].i, Expandidos[Expandidos.length - 1].j) : ""
    }
    VerVecinos(inicio.i, inicio.j)

    return{
        Matriz: Matriz,
        Frontera: Frontera,
        Expandidos: Expandidos,
        Acumulador: Acumulador
    } 
}

const Ordenar = lista => {
    lista.sort((a, b) => {
        if (a.Costo > b.Costo) {
            return 1;
        }
        if (a.Costo < b.Costo) {
            return -1;
        }
        // a must be equal to b
        return 0;
    })
}

module.exports.verVecinos = Algoritmo

