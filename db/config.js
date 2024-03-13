import { MongoClient } from "mongodb";

//const connectionUrl = process.env.DB_URI;

let client = null;

async function connectDB() {
  if (!client) {
    try {
      client = new MongoClient(process.env.DB_URI);
      await client.connect();
      console.log("database connection successfull...");
    } catch (err) {
      console.log("database connection unsuccessfull...");
      throw err;
    }
  }
  return client.db(process.env.DB_NAME);
}

export default connectDB;
