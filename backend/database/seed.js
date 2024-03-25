import axios from "axios";
import {
  db,
  User,
  Post,
  Park,
  Activity,
  Message,
  Follow,
  Comment,
} from "./model.js";

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

const actRes = await axios.get(
  "https://developer.nps.gov/api/v1/activities?api_key=3Jbh4dsnub0nqzpYLYJuN5FtCeEPbNbwN2ZB4Rt4"
);
const allActivities = actRes.data.data;
// find all activity names possible and create an Activity in DB for each one
for (const activity of allActivities) {
  await Activity.create({
    name: activity.name,
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
  const allImages = park.images.map((image) => image.url);

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

for (const user of users) {
  await User.create(user);
}

let posts = [
  {
    postPic:
      "https://www.justgotravelstudios.com/cdn/shop/articles/IMG_8596-Edit.jpg?v=1644329437&width=1100",
    postText: "Just hiked Angel's landing! 10/10 would recommend!",
    userId: 1,
    parkId: 61,
  },
  {
    postPic:
      "https://pbs.twimg.com/media/GI0ODf3awAAuM66?format=jpg&name=large",
    postText: "Scouts Lookout Trail\nCanyon Overlook Trail\nZion National Park",
    userId: 2,
    parkId: 61,
  },
  {
    postPic:
      "https://pbs.twimg.com/media/GIxq5gBbAAAl5vC?format=jpg&name=medium",
    postText:
      "The Observation Point Trail is one of the best hikes in Zion National Park. How to reach this epic viewpoint? Read all about it in this article. https://opreismetco.nl/en/united-states/hiking-to-observation-point-zion-national-park-utah-usa/",
    userId: 3,
    parkId: 61,
  },
];

for (const post of posts) {
  await Post.create(post);
}

let messages = [
  {
    senderId: 3,
    receiverId: 2,
    body: "Hey!",
  },
];

for (const message of messages) {
  await Message.create(message);
}

let comments = [
  {
    commentText: "this is fine comment1.",
    userId: 1,
    postId: 1,
  },
  {
    commentText: "this is fine comment2.",
    userId: 1,
    postId: 2,
  },
  {
    commentText: "this is fine comment3.",
    userId: 2,
    postId: 3,
  },
  {
    commentText: "this is fine comment4.",
    userId: 2,
    postId: 1,
  },
  {
    commentText: "this is fine comment5.",
    userId: 3,
    postId: 2,
  },
  {
    commentText: "this is fine comment6.",
    userId: 3,
    postId: 3,
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

await db.close();
