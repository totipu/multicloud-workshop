// var typeorm = require("typeorm"); 
// var EntitySchema = typeorm.EntitySchema; 
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId

function UserController () {

    const test4Test = async (req, res, next) => {
        // console.log(connection);
        return res.status(200).json({ "test": "test" });
    }

    const createUser = async (req, res) => {
        
        const userDocument = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            eMail: req.body.eMail,
            password: req.body.password,
            age: req.body.age
        };

        const dbConnect = dbo.getDb();

        dbConnect
            .collection('Users')
            .insertOne(userDocument, function (err, result) {
                if (err) {                    
                    res.status(500).send('Error inserting user!');
                    console.log(err);
                } else {
                    console.log(`Added a new User with id ${result.insertedId}`);
                    res.status(200).json(result.ops[0]);
                }
            });
    }

    const getAllUsers = async (req, res) => {

        const dbConnect = dbo.getDb();

        dbConnect
            .collection("Users")
            .find({})
            .toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).json(result);
                }
            });

    }

    const getUserById = async (req, res) => {

        const { id } = req.params;

        const dbConnect = dbo.getDb();

        dbConnect
            .collection("Users")
            .findOne({_id: ObjectId(id)}, function (err, result) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).json(result);
            }
            });
    }

    const updateUser = async (req, res) => {
        
        const { id } = req.params;

        const userDocument = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            eMail: req.body.eMail,
            password: req.body.password,
            age: req.body.age
        };

        const dbConnect = dbo.getDb();

        dbConnect
            .collection('Users')
            .update({_id: ObjectId(id)}, userDocument, function (err, result) {
                if (err) {
                    res.status(400).send(`Error updating user with id ${id}!`);
                } else {
                    console.log('1 document updated');
                    userDocument['_id'] = id;
                    res.status(200).json(userDocument);
                }
            });


    }

    const deleteUser = async (req, res) => {
        const { id } = req.params;

        const dbConnect = dbo.getDb();

        dbConnect
            .collection('listingsAndReviews')
            .deleteOne({_id: ObjectId(id)}, function (err, _result) {
                if (err) {
                    res.status(400).send(`Error deleting user with id ${id}!`);
                } else {
                    console.log('1 document deleted');
                }
            });
    }

    return {
        test4Test,
        createUser,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser
    };
}

module.exports = UserController;
