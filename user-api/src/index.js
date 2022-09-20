const express = require("express");
const UsersRouter = require('./users/users.router');
var morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

const app = express();

app.use(express.json());

// log every HTTP request in Apache combined format
app.use(morgan('combined'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/', UsersRouter)

const port = process.env.PORT || "3000";

app.listen(port, () => {    
    console.log(`Server Running at ${port} 🚀`);
});