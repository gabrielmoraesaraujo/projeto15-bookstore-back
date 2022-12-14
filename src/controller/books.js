import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);


let db;

mongoClient.connect().then(() => {
  db = mongoClient.db('bookstoreBD');
});

export async function postBook(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  db.collection('sessionsBD')
      .findOne({
        token: token,
      })
      .then((result) => {
        if (result === null) {
          return res.sendStatus(404);
        }
        db.collection('booksBD').insertOne({
          ...req.body,
          userID: result.userId,
        });
        res.sendStatus(201);
      });
}

export async function getBook(req, res) {
  const {genre} = req.params;
  if (genre === 'all') {
    db.collection('booksBD')
        .find()
        .toArray()
        .then((user) => {
          res.send(user);
        });
  } else {
    db.collection('booksBD')
        .find({
          genre: genre,
        })
        .toArray()
        .then((user) => {
          if (user.length === 0) return res.sendStatus(404);
          else {
            res.send(user);
          }
        });
  }
}