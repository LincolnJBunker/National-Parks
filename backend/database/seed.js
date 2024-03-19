import axios from "axios";
import { User, Post, Park, Activity, Message, Follow } from "./model.js";

await db.sync({
  force: true,
});

let users = [
  {
    username: "link",
    email: "jess90@gmail.com",
    password: "use",
  },
  {
    username: "cat",
    email: "fredflint@gmail.com",
    password: "use",
  },
  {
    username: "david",
    email: "artsyfartsy@gmail.com",
    password: "use",
  },
];

for (const user of users) {
  await User.create(user);
}

let posts = [
  {
    postPic: "",
    postText: "",
  },
  {
    postPic: "",
    postText: "",
  },
  {
    postPic: "",
    postText: "",
  },
];

for (const post of posts) {
  await Post.create(post);
}

let messages = [
  {
    input: "",
  },
];

for (const message of messages) {
  await Message.create(message);
}

let comments = [
  {
    input: "this is fine.",
  },
];

for (const comment of comments) {
  await Comment.create(comment);
}

let follows = [
  {
    followerId: 1,
    followedId: 2,
  },
];

for (const follow of follows) {
  await Follow.create(follow);
}

// await Comment.create({
//   input: "this is fine.",
//   userId: 1,
//   postId: 1,
// });

const actRes = await axios.get(
  "https://developer.nps.gov/api/v1/activities?api_key=3Jbh4dsnub0nqzpYLYJuN5FtCeEPbNbwN2ZB4Rt4"
);
const allActivities = actRes.data.data;
// find all activity names possible and create an Activity in DB for each one
for (const activity of allActivities) {
  const activities = await Activity.create({
    activity: activity.name,
  });
}

const res = await axios.get(
  "https://developer.nps.gov/api/v1/parks?start=0&limit=500&api_key=3Jbh4dsnub0nqzpYLYJuN5FtCeEPbNbwN2ZB4Rt4"
);
const allParks = res.data.data;
const nationals = allParks.filter(
  (park) =>
    park.designation.includes("National Park") || park.parkCode === "redw"
);

for (const park of nationals) {
  const allImages = park.images.map((image) => {
    image.url;
  });
  const newPark = await Park.create({
    fullName: park.fullName,
    description: park.description,
    latitude: park.latitude,
    longitude: park.longitude,
    states: park.states,
    images: allImages,
  });

  for (const activity of park.activities) {
    // each activity will have a name that would match an activity name already in DB
    // query for each activity in your DB to get its ID
    // connect it to this park with a FK relationship
    let newActivity = await Activity.findOne({
      where: { name: activity.name },
    }); // finds the activity in your DB
    await newPark.addActivity(newActivity); // sequelize creates this method b/c of relationship
    // if above line doesn't work right:
    // await ParkActivity.create({
    //     parkId: park.parkId,
    //     activityId: activity.activityId,
    // })
  }
}

await db.close();
