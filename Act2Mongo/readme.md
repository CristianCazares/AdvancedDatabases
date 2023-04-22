### Actividad 2 MongoDB: Esquemas forzados y referencias.

### Integrantes: `Cristian Javier Cázares`, `Brandon Josué Magaña`, `Carlos César Rodriguez` y `Arturo Jacob Gutiérrez`

#### 🗽 Instituto Tecnológico y de Estudios Superiores de Monterrey

<br>

# Base de datos de una escuela

## Crear base de datos `escuela`

```js
use escuela
```

## Crear referencias

Primero se creará la de materias, pues los alumnos pertenecen a estas

### Materias

```js
> db.createCollection("materias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de datos de escuela",
      required: ["_id", "nombre", "fechaInicio", "fechaFin", "semestre"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "el _id debe ser tipo objectId y es obligatorio",
        },
        nombre: {
          bsonType: "string",
          description: "el nombre debe de ser tipo cadena y es obligatorio",
        },
        fechaInicio: {
          bsonType: "string",
          description:
            "la fechaInicio debe de ser tipo cadena y es obligatorio",
        },
        fechaFin: {
          bsonType: "string",
          description: "la fechaFin debe de ser tipo cadena y es obligatorio",
        },
        semestre: {
          bsonType: "int",
          minimum: 1,
          maximum: 8,
          description:
            "el semestre debe de ser un número entre [1, 8] y es obligatorio.",
        },
      },
      additionalProperties: false,
    },
  },
});
```

### Alumnos

Ahora, dentro de la colección de alumnos hay un arreglo que guardará los id's de las materias a la que este alumno pertenece:

```js
> db.createCollection("materias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de datos de escuela",
      required: ["_id", "nombre", "fechaInicio", "fechaFin", "semestre"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "el _id debe ser tipo objectId y es obligatorio",
        },
        nombre: {
          bsonType: "string",
          description: "el nombre debe de ser tipo cadena y es obligatorio",
        },
        fechaInicio: {
          bsonType: "string",
          description:
            "la fechaInicio debe de ser tipo cadena y es obligatorio",
        },
        fechaFin: {
          bsonType: "string",
          description: "la fechaFin debe de ser tipo cadena y es obligatorio",
        },
        semestre: {
          bsonType: "int",
          minimum: 1,
          maximum: 8,
          description:
            "el semestre debe de ser un número entre [1, 8] y es obligatorio.",
        },
      },
      additionalProperties: false,
    },
  },
});
```

## Insertar datos:

Haremos uso de `insertOne` en repetidas ocaciones pues definimos los datos mientras insertamos cada documento.

### Materias

```js
> db.materias.insertOne({
  _id: ObjectId("A00000000001"),
  nombre: "Matemáticas",
  fechaInicio: "01-02-2023",
  fechaFin: "30-06-2023",
  semestre: 2,
});

> db.materias.insertOne({
  _id: ObjectId("A00000000002"),
  nombre: "Programación",
  fechaInicio: "01-03-2023",
  fechaFin: "31-07-2023",
  semestre: 3,
});

> db.materias.insertOne({
  _id: ObjectId("A00000000003"),
  nombre: "Inglés",
  fechaInicio: "15-05-2023",
  fechaFin: "15-09-2023",
  semestre: 5,
});

> db.materias.insertOne({
  _id: ObjectId("A00000000004"),
  nombre: "Matemáticas",
  fechaInicio: "01-02-2023",
  fechaFin: "30-06-2023",
  semestre: 3,
});
```

### Alumnos

```js
> db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Luis",
  apellido: "Martínez",
  fechaNacimiento: "15-09-2002",
  genero: "M",
  promedio: 78,
  materias: [ObjectId("A00000000001")],
});

> db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Juan",
  apellido: "Doe",
  fechaNacimiento: "13-02-2002",
  genero: "M",
  promedio: 94,
  materias: [ObjectId("A00000000002"), ObjectId("A00000000004")],
});

> db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Veronica",
  apellido: "Cortez",
  fechaNacimiento: "12-12-2001",
  genero: "F",
  promedio: 93,
  materias: [ObjectId("A00000000003")],
});

> db.alumnos.insertOne({
  _id: ObjectId(),
  nombre: "Roberto",
  apellido: "Ochoa",
  fechaNacimiento: "24-01-2002",
  genero: "M",
  promedio: 93,
  materias: [ObjectId("A00000000001")],
});
```

## Relación

Ahora bien, para demostrar la relación podemos buscar a todos los alumnos que pertenecen a la materia "A00000000001":

### Busqueda de alumnos por materia

```js
> db.alumnos.find({ materias: { $in: [ObjectId("A00000000001")] } });
```

#### Resultado

```js
[
  {
    _id: ObjectId("644446129a30b7f85ccf91c5"),
    nombre: "Luis",
    apellido: "Martínez",
    fechaNacimiento: "15-09-2002",
    genero: "M",
    promedio: 78,
    materias: [ObjectId("413030303030303030303031")],
  },
  {
    _id: ObjectId("644464eca393756bf0861a43"),
    nombre: "Roberto",
    apellido: "Ochoa",
    fechaNacimiento: "24-01-2002",
    genero: "M",
    promedio: 93,
    materias: [ObjectId("413030303030303030303031")],
  },
];
```

Nótese que internamente Mongo convierte los ObjectId a otro formato ligeramente diferente.

### Regresar todas las materias a las que pertenece un alumno:

Para lograr esto primero guardemos resultados de ciertas queries en variables

#### Alumno a buscar

```js
var alumno = db.alumnos.findOne({ nombre: "Juan", apellido: "Doe" });
```

#### Búsqueda de sus materias

```js
var materias = db.materias.find({ _id: { $in: alumno.materias } });
```

#### Resultado

Por último podriamos simplemente escribir >`materias` en la shell y tendríamos el resultado. Pero aprovechemos que en la shell de mongo se pueden ejecutar JavaScript e imprimamos únicamente el nombre de las materias a las que pertenece Juan Doe

```js
materias.forEach(function (materia) {
  print(materia.nombre);
});
```
