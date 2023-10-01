const express = require('express');
const app = express();

app.use(express.json());

const tecnico = [
    {id: 1, name: 'Álgebra Vectorial y Matrices', credits: 4, enrolled: true},
    {id: 2, name: 'Lenguajes de Marcado y Estilo Web', credits: 4, enrolled: true},
    {id: 3, name: 'Programación de Algoritmos', credits: 4, enrolled: true},
    {id: 4, name: 'Redes de Comunicación', credits: 4, enrolled: true},
    {id: 5, name: 'Análisis y Diseño de Sistemas y Base de Datos', credits: 4, enrolled: true},
    {id: 6, name: 'Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente', credits: 4, enrolled: true},
    {id: 7, name: 'Desarrollo de Aplicaciones con Software Propietario', credits: 4, enrolled: true},
    {id: 8, name: 'Programación Orientada a Objetos', credits: 4, enrolled: true},
    {id: 9, name: 'Administración de Servicios en la Nube', credits: 4, enrolled: true},
    {id: 10, name: 'Diseño y Programación de Software Multiplataforma', credits: 4, enrolled: true},
]

const ingenieria = [
    {id: 1, name: 'Ecuaciones Diferenciales', credits: 4, enrolled: true},
    {id: 2, name: 'Aplicacion de Metodos Numericos', credits: 4, enrolled: true},
    {id: 3, name: 'Quimica General', credits: 4, enrolled: true},
    {id: 4, name: 'Sistemas Operativos', credits: 4, enrolled: true},
    {id: 5, name: 'Ingenieria de Software', credits: 4, enrolled: true},
    {id: 6, name: 'Lenguajes Interpretados en el Cliente', credits: 4, enrolled: true},
    {id: 7, name: 'Lenguajes Interpretados en el Servidor', credits: 4, enrolled: true},
    {id: 8, name: 'Programación Estructurada', credits: 4, enrolled: true},
    {id: 9, name: 'Estadistica Aplicada', credits: 4, enrolled: true},
    {id: 10, name: 'programacion Orientada a Objetos', credits: 4, enrolled: true},
]

app.get('/', (req, res) => {
    res.send('Node JS api');
})

app.get('/api/tecnico', (req, res) =>{
    res.send(tecnico);
})

app.get('/api/ingenieria', (req, res) =>{
    res.send(ingenieria);
})

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));