const express = require('express');
const app = express();

app.use(express.json());

const tecnico = [
    {id: 1, name: 'Álgebra Vectorial y Matrices', credits: 4, enrolled: true},
    {id: 2, name: 'Lenguajes de Marcado y Estilo Web', credits: 4, enrolled: true},
    {id: 3, name: 'Programación de Algoritmos', credits: 4, enrolled: true},
    {id: 4, name: 'Redes de Comunicación', credits: 4, enrolled: true},
    {id: 5, name: 'Análisis y Diseño de Sistemas y Base de Datos', credits: 4, enrolled: true},
    {id: 6, name: 'Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente', prerequirements:[2],credits: 4, enrolled: true},
    {id: 7, name: 'Desarrollo de Aplicaciones con Software Propietario', prerequirements:[3],credits: 4, enrolled: true},
    {id: 8, name: 'Programación Orientada a Objetos', prerequirements:[3], credits: 4, enrolled: true},
    {id: 9, name: 'Administración de Servicios en la Nube', prerequirements:[3,4], credits: 4, enrolled: true},
    {id: 10, name: 'Diseño y Programación de Software Multiplataforma',prerequirements:[5,6] ,credits: 4, enrolled: true},
];

const ingenieria = [
    {id: 1, name: 'Ecuaciones Diferenciales', credits: 4, enrolled: true},
    {id: 2, name: 'Aplicacion de Metodos Numericos', credits: 4, enrolled: true},
    {id: 3, name: 'Quimica General', credits: 4, enrolled: true},
    {id: 4, name: 'Sistemas Operativos', credits: 4, enrolled: true},
    {id: 5, name: 'Ingenieria de Software', credits: 4, enrolled: true},
    {id: 6, name: 'Lenguajes Interpretados en el Cliente',prerequirements:[4,5], credits: 4, enrolled: true},
    {id: 7, name: 'Lenguajes Interpretados en el Servidor', prerequirements:[4,5],credits: 4, enrolled: true},
    {id: 8, name: 'Programación Estructurada', prerequirements:[4,5],credits: 4, enrolled: true},
    {id: 9, name: 'Estadistica Aplicada', prerequirements:[1,2],credits: 4, enrolled: true},
    {id: 10, name: 'programacion Orientada a Objetos',prerequirements:[4,5], credits: 4, enrolled: true},
];

const CicloTecnico =[
    {
        id:1, materias : [1,2,3,4,5]
    },
    {
        id:2, materias : [6,7,8,9,10]
    }
];
const CicloIngenieria =[
    {
        id:1, materias : [1,2,3,4,5]
    },
    {
        id:2, materias : [6,7,8,9,10]
    }
];
app.get('/', (req, res) => {
    res.send('Node JS api');
})

app.get('/api/tecnico', (req, res) =>{
    res.send(tecnico);
})
app.get('/api/ingenieria', (req, res) =>{
    res.send(ingenieria);
})
//ruta de prerequisitos por materia en ingenieria.
app.get('/api/ingenieria/:id', (req, res) =>{
    const MateriaIngenieria =  ingenieria.find( materia => materia.id === parseInt(req.params.id))
    if(!MateriaIngenieria)
    {
     return res.status(404).send('Oops, no hemos encontrado resultado.');
    }
    else
    {
     if(MateriaIngenieria.hasOwnProperty('prerequirements'))
     {
         const newMateria =  ingenieria.filter(c =>  MateriaIngenieria.prerequirements.includes(c.id) )
         res.send(newMateria);
     }
     else
    {
      res.send(`La siguiente materia "${MateriaIngenieria.name}" no necesita ningun prerequisito para cursar`);
    }
 }
})
//ruta prerequisitos por materia en tecnico.
app.get('/api/tecnico/:id', (req, res) =>{
    const MateriaTecnico =  tecnico.find( materia => materia.id === parseInt(req.params.id))
    if(!MateriaTecnico)
    {
     return res.status(404).send('Oops, no hemos encontrado resultado.');
    }
    else
    {
     if(MateriaTecnico.hasOwnProperty('prerequirements'))
     {
         const newMateria =  tecnico.filter(c =>  MateriaTecnico.prerequirements.includes(c.id) )
         res.send(newMateria);
     }
     else
    {
      res.send(`La siguiente materia "${MateriaTecnico.name}" no necesita ningun prerequisito para cursar`);
    }
 }
})
//ruta de consulta de materias por ciclos de Ingenieria.
app.get('/api/ingenieria/ciclo/:id', (req,res) => {
   const ciclo = CicloIngenieria.find( ciclo => ciclo.id === parseInt(req.params.id));
   if(!ciclo)
   {
    return res.status(404).send('Oops, no hemos encontrado resultado.');
   }
   else{
    const Materias = ingenieria.filter( materia => ciclo.materias.includes(materia.id));
    res.send(Materias);
   }
})
//ruta de consulta de materias por ciclos de Tecnico.
app.get('/api/tecnico/ciclo/:id', (req,res) => {
    const ciclo = CicloTecnico.find( ciclo => ciclo.id === parseInt(req.params.id));
    if(!ciclo)
    {
     return res.status(404).send('Oops, no hemos encontrado resultado.');
    }
    else{
     const Materias = tecnico.filter( materia => ciclo.materias.includes(materia.id));
     res.send(Materias);
    }
 })
const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));

// Ruta para inscripción de materias por carrera seleccionada
app.post('/api/inscripcion-carrera', (req, res) => {
  const { carrera, materias } = req.body;

  // Verificar que la carrera exista (tecnico o ingenieria)
  const carreraSeleccionada = carrera === 'tecnico' ? tecnico : carrera === 'ingenieria' ? ingenieria : null;

  if (!carreraSeleccionada) {
    return res.status(400).json({ message: 'Carrera no válida.' });
  }


         // Validar que la cantidad total de UV no exceda 4
const totalUV = materias.reduce((acc, materiaId) => {
    const materia = carreraSeleccionada.find((m) => m.id === materiaId);
    return acc + (materia ? materia.credits : 0);
}, 0);

if (totalUV > 4) {
    return res.status(400).json({ message: 'La cantidad de UV excede el límite permitido.' });
}

// Verificar que se estén inscribiendo exactamente 4 materias
if (materias.length !== 4) {
    return res.status(400).json({ message: 'Debes inscribir exactamente 4 materias.' });




// Verificar que las materias sean válidas
const materiasValidas = materias.every((materiaId) => {
    return carreraSeleccionada.some((m) => m.id === materiaId);
});

if (!materiasValidas) {
    return res.status(400).json({ message: 'Alguna de las materias seleccionadas no es válida para la carrera.' });
}

const materiasInscritas = [];

materias.forEach((materiaId) => {
    const materia = carreraSeleccionada.find((m) => m.id === materiaId);
    if (materia) {
        materiasInscritas.push(materia);
    }
});



// Ejemplo de respuesta con las materias inscritas
res.status(200).json({ message: 'Inscripción por carrera exitosa', materiasInscritas });
    
    //ruta para eliminar inscripcion de materia por ID
app.delete("/inscripciones/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = inscripciones.findIndex((inscripcion) => inscripcion.id === id);

  if (index !== -1) {
    inscripciones.splice(index, 1);
    res.status(204).send(); // Respuesta exitosa sin contenido
  } else {
    res.status(404).json({ message: "Inscripción no encontrada" });
  }
});
