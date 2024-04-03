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
import posts from './posts.js';

await db.sync({
  force: true,
});

let users = [
  {
    username: "link",
    email: "jess90@gmail.com",
    password: "use",
    userPic:
      "https://media.licdn.com/dms/image/D4E03AQFtlYt-bVrtKQ/profile-displayphoto-shrink_800_800/0/1704831030407?e=2147483647&v=beta&t=NkWH-3hqMW5W7WpBXnNLjOIJwGk_wOq5E-gxpnyMHVQ",
  },
  {
    username: "cat",
    email: "fred@gmail.com",
    password: "use",
    userPic:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/428659387_10159868671225732_2012584730671016119_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFtMxtOevvVY25BaNWwJaWRxWF5j4cb6tjFYXmPhxvq2L-dMmAvPsRoEvqtYq2ySYk&_nc_ohc=-YEAZWdid_EAb7JRMHR&_nc_ht=scontent-lax3-2.xx&oh=00_AfDmYfCLaWicnndPdbGQDotUXU7ZutvnrM1W1H25Wd5rrQ&oe=6613656E",
  },
  {
    username: "david",
    email: "artsyfartsy@gmail.com",
    password: "use",
    userPic:
      "https://media.licdn.com/dms/image/D5603AQFOylu72kgGcA/profile-displayphoto-shrink_800_800/0/1691684632843?e=1717027200&v=beta&t=NSaw3788aUgZlMUNVjhDmsU4tnmm6YnYc8AvB0ZCIFs",
  },
  {
    username: "josh",
    email: "joshywoshy@gmail.com",
    password: "use",
    userPic:
      "https://steamuserimages-a.akamaihd.net/ugc/1832425458640201190/52EA68A9E9DCF8D6FB23199C07DBCB539D1690F2/",
  },
  {
    username: "jesse",
    email: "tigerwoodsfan89@gmail.com",
    password: "use",
    userPic:
      "https://c.ndtvimg.com/2021-03/flecai7g_elon-musk-in-1989-young-elon-musk_625x300_03_March_21.jpg",
  },
  {
    username: "michael",
    email: "hiimmichael@gmail.com",
    password: "use",
    userPic:
      "https://media.uiargonaut.com/wp-content/uploads/2016/05/rawrfeb3.jpg",
  },
  {
    username: "ty",
    email: "tyguyhighfly@gmail.com",
    password: "use",
    userPic: "https://www.mafab.hu/static/2014t/284/20/43870_75.jpg",
  },
  {
    username: "M",
    email: "missbettymiss@gmail.com",
    password: "use",
    userPic:
      "https://www.cheatsheet.com/wp-content/uploads/2021/06/Headshot-of-Marilyn-Monroe-wearing-bright-red-lipstick-and-smiling-for-the-camera.jpg",
  },
  {
    username: "Uncle Bob",
    email: "MrValleyMusic@gmail.com",
    password: "use",
    userPic:
      "https://mockup-api.teespring.com/v3/image/P0L7YnhhEQSifBnwDfXXug8XMnk/800/800.jpg",
  },
  {
    username: "Kyle",
    email: "kyleftw@gmail.com",
    password: "use",
    userPic:
      "https://dmsjourney.com/wp-content/uploads/elementor/thumbs/Dungeon-Master-q2hmz3ka657n8z57zxnidmaspfkvi1kznr5jjzymps.jpg",
  },
  {
    username: "Jackson",
    email: "jackson@gmail.com",
    password: "use",
    userPic:
      "https://images.immediate.co.uk/production/volatile/sites/3/2023/04/naruto-762b09d.jpg?resize=768,574",
  },
  {
    username: "Sean",
    email: "seanthewonderful@gmail.com",
    password: "use",
    userPic:
      "https://static.wikia.nocookie.net/wowpedia/images/e/e0/Illidan_the_Betrayer.jpg/revision/latest?cb=20150907112817",
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

// let myNationionals = nationals.map((park, idx) => {
//   return {id: idx+1, fullName: park.fullName, activites: park.activities.map(a=>a.name)}
// })
// console.log(JSON.stringify(myNationionals))

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



for (const post of posts) {
  Post.create(post).then((p) => {
    p.addActivities(post.activities);
  });
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
    commentText: "Sick bro! (comment6).",
    userId: 3,
    postId: 3,
  },
];

for (const comment of comments) {
  await Comment.create(comment);
}

let follows = [
  {
    follower: 1,
    following: 2,
  },
  {
    follower: 2,
    following: 3,
  },
  {
    follower: 3,
    following: 1,
  },
  {
    follower: 1,
    following: 3,
  },
  {
    follower: 3,
    following: 2,
  },
  {
    follower: 3,
    following: 4,
  },
  {
    follower: 3,
    following: 5,
  },
  {
    follower: 3,
    following: 6,
  },
];

for (const follow of follows) {
  await Follow.create(follow);
}

await db.close();
