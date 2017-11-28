const Estrella = require('./aEstrella.js')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')

bodyParser.json();

app.use(cors())
app.get('/api/matriz', (req, res) => {

    let isRandom = req.query.random == 1 ? true : false
    let MatrixSize =  req.query.size ?  req.query.size : 6
    console.log(req.query)
    console.log(isRandom)
    let Matriz = isRandom ? Estrella.RandomMatrix(MatrixSize, 1, 5) : [
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 1, 2],
        [2, 2, 2, 2, 2, 2],
        [1, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
    ];

    console.log(Matriz)
    let Res = Estrella.getCoordenadasObjetivo(Matriz);
    let Inicio = isRandom ? Estrella.getRandomTargets(MatrixSize) : { i: 2, j: 2 };
    let Final = isRandom ? Estrella.getRandomTargets(MatrixSize) : { i: 1, j: 5 };

    console.log(Inicio, Final)

    let MatrizModificada = Estrella.AsignarCostos(Matriz, Inicio, Final);
    res.send(Estrella.verVecinos(MatrizModificada, Inicio, Final))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/app.html'));
})

app.listen(3001, () => console.log("Running..."))

// setTimeout(() => {
//     // Estrella.dibujarMatriz(MatrizModificada);
//     let result = Estrella.verVecinos(MatrizModificada, Inicio.i, Inicio.j);
//     console.log(result);
//     // console.log(Frontera);
//     // Chidos.forEach(function(element) {
//     //     let timpx = document.getElementById("Elemento_" + element.i + "-" + element.j);
//     //     timpx.style.backgroundColor = "yellow";
//     // }, this);
// }, 200);

// console.log(MatrizModificada);
