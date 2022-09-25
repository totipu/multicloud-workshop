// const fs = require('fs');
// const html = fs.readFileSync('index.html', { encoding:'utf8' });

var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 


connection = typeorm.createConnection({ 
   "type": "postgres", 
   "host": process.env.DATABASE_HOST, 
   "port": process.env.DATABASE_PORT, 
   "username": process.env.DATABASE_USERNAME, 
   "password": process.env.DATABASE_PASSWORD, 
   "database": process.env.DATABASE_NAME,
   "synchronize": true, 
   "logging": false, 
   entities: [ new EntitySchema(require("./src/entity/user.json")) 
   ] 
});

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    
    console.log("RouteKey: ", event.routeKey);

    try {
        switch (event.routeKey) {
            
            case 'GET /users/{id}':
                console.log("Single User GET Triggered!");
                conn = typeorm.getConnection();
                id = event.pathParameters.id;
                userRepo = await conn.getRepository("User");
                body = await userRepo.findOneBy({ id: parseInt(id) });

                break;

            case 'GET /users':
                console.log("All Users GET Triggered!");
                conn = typeorm.getConnection();
                userRepo = await conn.getRepository("User");
                body = await userRepo.find();

                break;
            
            case 'DELETE /users/{id}':
                conn = typeorm.getConnection();
                id = event.pathParameters.id;
                userRepo = await conn.getRepository("User");
                body = await userRepo.delete({ id: parseInt(id) });                
                break;

            case 'PUT /users/{id}':
                conn = typeorm.getConnection();
                id = event.pathParameters.id;
                userRepo = await conn.getRepository("User");
                body = await userRepo.update(parseInt(id), event.body);
                break;

            case 'POST /users':
                conn = typeorm.getConnection();
                userRepo = await conn.getRepository("User");
                result = await userRepo.create(event.body);
                body = await userRepo.save(result);
                break;

            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }
    
    return {
        statusCode,
        body,
        headers
    }
};
