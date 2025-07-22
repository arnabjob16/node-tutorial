const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Concept 27',
      version: '1.0.0',
      description: 'Secure API with JWT, Upload, and Pagination'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }],
    tags: [
        {
            name: 'Auth',
            description: 'Authentication endpoints'
        },
        {
            name: 'User',
            description: 'User and file upload endpoints'
        }
    ]
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Scan route files for docs
};
 
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;