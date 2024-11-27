const swaggerJSDoc = require('swagger-jsdoc')


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Search API',
      version: '1.0.0',
      description: 'This is a Node.js Search API documentation.',
    }
  }
  
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
  };
  
  const swaggerSpec = swaggerJSDoc(options);

  module.exports = swaggerSpec;