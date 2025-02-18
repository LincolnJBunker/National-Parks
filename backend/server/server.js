import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import handlerFunctions from "./controller.js";
import awsFunctions from "./awsController.js";
import multer from "multer";


const app = express();

const port = "9001";

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
app.get("/api/park/:parkId", handlerFunctions.getOnePark);
app.get("/allActivities", handlerFunctions.getAllActivities);
app.get("/api/session-check", handlerFunctions.sessionCheck);
app.post("/api/login", handlerFunctions.login);
app.get("/api/logout", handlerFunctions.logout);
app.post("/api/createaccount", handlerFunctions.createAccount);
// route to get posts use {mode: ['park', 'user', or 'friends'], id: id}
app.post("/api/posts", handlerFunctions.getPosts);
app.get("/api/parkMarkers", handlerFunctions.parkMarkers);
// app.get('/api/activityMarkers', handlerFunctions.activityMarkers)
app.post('/api/newInbox', handlerFunctions.newInbox)
app.post("/api/addPost", handlerFunctions.addPost);
app.post("/api/userInfo", handlerFunctions.userInfo);
app.put("/api/user/update/:id", handlerFunctions.updateUser);
app.post("/api/comment", handlerFunctions.postComment);
app.delete('/api/comment/:commentId', handlerFunctions.deleteComment)
app.get("/api/follows/:id", handlerFunctions.getFollows);
app.delete("/api/user/delete/:userId", handlerFunctions.deleteUser);
app.delete("/api/post/delete/:postId", handlerFunctions.deletePost);
app.get("/api/profile/:profileId", handlerFunctions.getOneUser);
app.post("/api/followUser", handlerFunctions.followUser);
app.put("/api/unfollowUser", handlerFunctions.unfollowUser);
// app.post('/api/upload', multer({ dest: 'uploads/' }).single('profilePic'), awsFunctions.upload)


ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
