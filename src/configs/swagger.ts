import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "Documentação da API Task Manager",
    },
  },
  apis: ["./src/routes/*.ts"], // Caminho dos arquivos de rotas
};

export default swaggerJSDoc(options);
