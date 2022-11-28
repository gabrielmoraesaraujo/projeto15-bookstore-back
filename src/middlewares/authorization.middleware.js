import mongo from '../db/db.js';

async function hasUser(req, res, next) {
  const {token} = req.headers;
  console.log(token);

  try {
    const db = await mongo();

    const user = await db.collection('sessionsBD').findOne({token: token});

    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.send(500);
  }
}

export default hasUser;