const { MongoClient } = require("mongodb");
const { ServerApiVersion } = require("mongodb/lib/core");
const connectionString = process.env.MONGODB_URI;
const databaseName = process.env.DATABASE_NAME;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db(databaseName);
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};