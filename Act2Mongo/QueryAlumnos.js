db.createCollection("alumnos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de datos de escuela",
      required: [
        "_id",
        "nombre",
        "apellido",
        "fechaNacimiento",
        "genero",
        "promedio",
      ],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "_id debe de ser tipo objectId y obligatorio",
        },
        nombre: {
          bsonType: "string",
          description: "el nombre debe de ser tipo cadena y es obligatorio",
        },
        apellido: {
          bsonType: "string",
          description: "el apellido debe de ser tipo cadena y es obligatorio",
        },
        fechaNacimiento: {
          bsonType: "string",
          description:
            "la fechaNacimiento debe de ser tipo cadena y es obligatorio",
        },
        genero: {
          enum: ["M", "F", "no especificado"],
          description: "debe ser M, F o no especificado",
        },
        promedio: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
          description:
            "'el promedio debe ser un entero entre [ 0, 100 ] y es obligatorio",
        },
      },
      additionalProperties: false,
    },
  },
});
