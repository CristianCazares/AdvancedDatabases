db.alumnos.insertOne({
  nombre: "John Doe",
  materia_id: ObjectId(),
  apellido: "DD-MM-AAAA",
  fechaNacimiento: "DD-MM-AAAA",
  genero: "M",
  promedio: 0,
});

db.alumnos.update(
  { id: "A00X" },
  {
    $set: {
      materias: [
        {
          id: "M00X",
          nombre: "Computer Science",
          fechaInicio: "DD-MM-AAAA",
          fechaFin: "DD-MM-AAAA",
          semestre: 1,
        },
      ],
    },
  }
);

db.materias.insertOne({
  _id: ObjectId("A0000000000X"),
  nombre: "nombre",
  fechaInicio: "DD-MM-AAAA",
  fechaFin: "DD-MM-AAAA",
  semestre: 4,
});

db.materias.insertOne({
  _id: ObjectId("A00000000001"),
  nombre: "Matemáticas",
  fechaInicio: "01-02-2023",
  fechaFin: "30-06-2023",
  semestre: 2,
});

db.materias.insertOne({
  _id: ObjectId("A00000000002"),
  nombre: "Programación",
  fechaInicio: "01-03-2023",
  fechaFin: "31-07-2023",
  semestre: 3,
});

db.materias.insertOne({
  _id: ObjectId("A00000000003"),
  nombre: "Inglés",
  fechaInicio: "15-05-2023",
  fechaFin: "15-09-2023",
  semestre: 5,
});

db.materias.insertOne({
  _id: ObjectId("A00000000004"),
  nombre: "Matemáticas",
  fechaInicio: "01-02-2023",
  fechaFin: "30-06-2023",
  semestre: 3,
});

db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Luis",
  apellido: "Martínez",
  fechaNacimiento: "15-09-2002",
  genero: "M",
  promedio: 78,
  materias: [ObjectId("A00000000001")],
});

db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Juan",
  apellido: "Doe",
  fechaNacimiento: "13-02-2002",
  genero: "M",
  promedio: 94,
  materias: [ObjectId("A00000000002"), ObjectId("A00000000004")],
});

db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Veronica",
  apellido: "Cortez",
  fechaNacimiento: "12-12-2001",
  genero: "F",
  promedio: 93,
  materias: [ObjectId("A00000000003")],
});

db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Roberto",
  apellido: "Ochoa",
  fechaNacimiento: "24-01-2002",
  genero: "F",
  promedio: 93,
  materias: [ObjectId("A00000000001")],
});

db.alumnos.find({ materias: { $in: [ObjectId("A00000000001")] } });

db.alumnos.updateOne(
  { nombre: "Juan" },
  { $set: { "materias": [ObjectId("A00000000002"), ObjectId("A00000000004")] } }
);
