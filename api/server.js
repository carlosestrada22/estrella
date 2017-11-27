const Estrella = require('./aEstrella.js')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')

bodyParser.json();

app.use(cors())
app.get('/api/matriz', (req, res) => {
    let Matriz = [
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 1, 2],
        [2, 2, 2, 2, 2, 2],
        [1, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
    ];

    let Res = Estrella.getCoordenadasObjetivo(Matriz);
    let Inicio = { i: 2, j: 2 };
    let Final = { i: 1, j: 5 };

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
