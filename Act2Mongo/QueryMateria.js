db.createCollection("materias", {
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
