import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import handlerFunctions from "./controller.js";

const app = express();

const port = '9001';

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "hello",
    saveUninitialized: false,
    resave: false,
  })
);

app.get("/allParks", handlerFunctions.getAllParks);
app.get('/api/session-check', handlerFunctions.sessionCheck);
app.post('/api/login', handlerFunctions.login);
// app.get('/api/logout', handlerFunctions.logout);
// app.post('/api/createaccount', handlerFunctions.createAccount)

// route to get posts use {mode: ['park', 'user', or 'friends'], id: id}
app.get('/api/posts', handlerFunctions.getPosts)

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
