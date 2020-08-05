const mongoose = require("mongoose");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_DB } = process.env;

const MONGO_HOSTNAME =
  process.env["NODE_ENV"] === "development" ? "localhost" : "mongo";

const MONGOURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
    });
    console.log("\n\nConnected to mongodb\n\n");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
