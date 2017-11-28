const Estrella = require('./aEstrella.js')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')

app.use(bodyParser.json());

app.use(cors())


app.get('/api/matriz', (req, res) => {

    let isRandom = req.query.random == 1 ? true : false
    let MatrixSize = req.query.size ? req.query.size : 6
    // console.log(req.query)
    // console.log(isRandom)
    let Matriz = isRandom ? Estrella.RandomMatrix(MatrixSize, 1, 6) : [
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 1, 2],
        [2, 2, 2, 2, 2, 2],
        [1, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
    ];

    let Res = Estrella.getCoordenadasObjetivo(Matriz);
    let Inicio = isRandom ? Estrella.getRandomTargets(MatrixSize) : { i: 2, j: 2 };
    let Final = isRandom ? Estrella.getRandomTargets(MatrixSize) : { i: 1, j: 5 };


    let MatrizModificada = Estrella.AsignarCostos(Matriz, Inicio, Final);
    res.send(Estrella.verVecinos(MatrizModificada, Inicio, Final))
});

app.post('/api/matriz', (req, res) => {

    let MatrixSize = req.query.size
    let Matriz = req.body.Matriz
    let rInicio = req.body.Inicio
    let rFinal = req.body.Final
    let Personaje = req.body.Personaje
    let Inicio = rInicio ? rInicio : Estrella.getRandomTargets(MatrixSize)
    let Final = rFinal ? rFinal : Estrella.getRandomTargets(MatrixSize)

    console.log(Matriz)

    if(rInicio || rFinal){
        let nuevaMatriz = []
        Matriz.forEach((element) => {
            let nuevoRow = []
            element.forEach( subElement => {
                nuevoRow.push(subElement.Valor ? subElement.Valor : subElement)
            }, this)
            nuevaMatriz.push(nuevoRow)
        }, this);
        Matriz = nuevaMatriz
        // console.log(Matriz)
    }
    // console.log(Matriz)

    let MatrizModificada = Estrella.AsignarCostos(Matriz, Inicio, Final, Personaje);
    // console.log(MatrizModificada)
    res.send(Estrella.verVecinos(MatrizModificada, Inicio, Final))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/app.html'));
})

app.listen(3001, () => console.log("Running..."))
