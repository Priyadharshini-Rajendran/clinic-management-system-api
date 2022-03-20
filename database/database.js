const { MongoClient } = require('mongodb');
const connectionString = 'mongodb+srv://priyasharshini:Priya_1215@cluster0.ugvwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('clinic');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
