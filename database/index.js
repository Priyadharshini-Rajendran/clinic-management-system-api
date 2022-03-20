`use strict`;

const { MongoClient } = require(`mongodb`);
let _dbClientsMap = new Map();

module.exports = {
  connect: async function () {
    try {
      const key = 'clinic';
      let dbClient = _dbClientsMap.get(key);
      if (!dbClient || !dbClient.topology.isConnected()) {
        let connectionString = 'mongodb+srv://priyadharshini:Priya_1215@clinic.ugvwv.mongodb.net/clinic?retryWrites=true&w=majority';
        dbClient = await MongoClient.connect(connectionString);
        _dbClientsMap.set(key, dbClient);
      }
      return dbClient;
    } catch (error) {
      console.error(`Error occurred when connecting to database ${clinic}`, error);
      throw error;
    }
  },
  getDb: async function () {
    const dbClient = await this.connect();
    return dbClient.db();
  },
};
