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
                url: 'http://localhost:8000', // URL của server
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
                    }
                },
                Blog: { // Định nghĩa Blog schema
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID của bài viết'
                        },
                        title: {
                            type: 'string',
                            description: 'Tiêu đề bài viết'
                        },
                        content: {
                            type: 'string',
                            description: 'Nội dung bài viết'
                        },
                        author: {
                            type: 'string',
                            description: 'Tác giả bài viết'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Thời gian tạo bài viết'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Thời gian cập nhật bài viết'
                        }
                    }
                },
                Reservation: {
                    type: 'object',
                    required: [
                        'Name',
                        'numberOfPeople',
                        'reservationDate',
                        'phoneNumber'
                    ],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The unique identifier of the reservation'
                        },
                        Name: {
                            type: 'string',
                            description: 'Name for the reservation'
                        },
                        numberOfPeople: {
                            type: 'integer',
                            description: 'Number of people for the reservation'
                        },
                        reservationDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date and time of the reservation'
                        },
                        phoneNumber: {
                            type: 'string',
                            description: 'Phone number for the reservation'
                        },
                        message: {
                            type: 'string',
                            description: 'Optional message or notes for the reservation'
                        }
                    }
                },
                Error: { // Thêm Error schema
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Indicates if the request was successful',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Error message',
                            example: 'Error message'
                        }
                    }
                },
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'], // Đường dẫn tới file định nghĩa API
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
