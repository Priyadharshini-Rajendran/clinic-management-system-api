const database = require('../database/database');

const loginUser = async (req, res) => {
  try {
    const { body } = req;
    const dbConnect = await database.getDb();
    if (dbConnect) {
      const userResponse = await dbConnect.collection('applicationUser').findOne({ userId: body.userId, password: body.password });
      res.status(200).json(userResponse);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { loginUser };
