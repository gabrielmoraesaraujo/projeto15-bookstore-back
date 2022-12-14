import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function mongo() {
  let conn;

  try {
    conn = mongoClient.db('bookstoreBD');
    return conn;
  } catch (error) {
    console.error(error);
    return error;
  }
}   