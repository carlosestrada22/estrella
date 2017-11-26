const Estrella = require('./aEstrella.js')

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

bodyParser.json();


let Matriz = [
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, -1, 2],
    [2, 2, 2, 2, 2, 2],
    [1, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
];

var Res = Estrella.getCoordenadasObjetivo(Matriz);
var Inicio = Res.Inicio;
var Final = Res.Final;

var MatrizModificada = Estrella.AsignarCostos(Matriz, Final);

app.get('/api/matriz', (req, res) => {
    res.send(Estrella.verVecinos(MatrizModificada, Inicio.i, Inicio.j));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/app.html'));
})

app.listen(3000, () => console.log("Running..."))

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
