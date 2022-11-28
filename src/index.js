import express from "express";
import cors from "cors";
import cartRoute from "./routes/cartRouter.js";
import purchasesRoute from "./routes/purchaseRoute.js";
import registrateRouters from "./routes/resgistrateRoute.js";
import bookRouter from "./routes/bookRouter.js";
import { postLogin } from "./controller/login.js";
const app = start();

app.use(registrateRouters);

app.use(bookRouter);

app.post("/login", postLogin);

app.use(cartRoute);

app.use(purchasesRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
}