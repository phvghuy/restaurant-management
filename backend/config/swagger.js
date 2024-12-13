const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Cấu hình cho Swagger
const options = {
    definition: {
        openapi: '3.0.0', // Phiên bản OpenAPI
        info: {
            title: 'Restaurant Management API', // Tiêu đề
            version: '1.0.0', // Phiên bản
            description: 'API quản lý nhà hàng' // Mô tả
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL của server
                description: 'Local server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The unique identifier of the user'
                        },
                        fullName: {
                            type: 'string',
                            description: 'Full name of the user'
                        },
                        email: {
                            type: 'string',
                            description: 'Email address of the user'
                        },
                        phoneNumber: {
                            type: 'string',
                            description: 'Phone number of the user'
                        },
                        isActive: {
                            type: 'boolean',
                            description: 'Whether the user account is active'
                        }
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Đường dẫn tới file định nghĩa API
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
