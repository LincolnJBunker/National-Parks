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
    userPic:
      "https://media.licdn.com/dms/image/D4E03AQFtlYt-bVrtKQ/profile-displayphoto-shrink_800_800/0/1704831030407?e=2147483647&v=beta&t=NkWH-3hqMW5W7WpBXnNLjOIJwGk_wOq5E-gxpnyMHVQ",
  },
  {
    username: "cat",
    email: "fred@gmail.com",
    password: "use",
    userPic:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/428659387_10159868671225732_2012584730671016119_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFtMxtOevvVY25BaNWwJaWRxWF5j4cb6tjFYXmPhxvq2L-dMmAvPsRoEvqtYq2ySYk&_nc_ohc=ZMpYOBIXMHgAX9BglFO&_nc_ht=scontent-lax3-2.xx&oh=00_AfC7UEtLodYTYF7K_5m6zsvx_xU_pnmPoy53XEKOePeShQ&oe=660B0BEE",
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
    userPic: "https://steamuserimages-a.akamaihd.net/ugc/1832425458640201190/52EA68A9E9DCF8D6FB23199C07DBCB539D1690F2/",

  },
  {
    username: "jesse",
    email: "tigerwoodsfan89@gmail.com",
    password: "use",
    userPic: "https://c.ndtvimg.com/2021-03/flecai7g_elon-musk-in-1989-young-elon-musk_625x300_03_March_21.jpg",
  },
  {
    username: "michael",
    email: "hiimmichael@gmail.com",
    password: "use",
    userPic: "https://media.uiargonaut.com/wp-content/uploads/2016/05/rawrfeb3.jpg",
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
    userPic: "https://www.cheatsheet.com/wp-content/uploads/2021/06/Headshot-of-Marilyn-Monroe-wearing-bright-red-lipstick-and-smiling-for-the-camera.jpg",
  },
  {
    username: "Uncle Bob",
    email: "MrValleyMusic@gmail.com",
    password: "use",
    userPic: "https://mockup-api.teespring.com/v3/image/P0L7YnhhEQSifBnwDfXXug8XMnk/800/800.jpg",
  },
  {
    username: "Kyle",
    email: "kyleftw@gmail.com",
    password: "use",
    userPic: "https://dmsjourney.com/wp-content/uploads/elementor/thumbs/Dungeon-Master-q2hmz3ka657n8z57zxnidmaspfkvi1kznr5jjzymps.jpg",
  },
  {
    username: "Jackson",
    email: "jackson@gmail.com",
    password: "use",
    userPic: "https://images.immediate.co.uk/production/volatile/sites/3/2023/04/naruto-762b09d.jpg?resize=768,574",
  },
  {
    username: "Sean",
    email: "seanthewonderful@gmail.com",
    password: "use",
    userPic: "https://static.wikia.nocookie.net/wowpedia/images/e/e0/Illidan_the_Betrayer.jpg/revision/latest?cb=20150907112817",
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

let posts = [
  {
    postPic:
      "https://www.justgotravelstudios.com/cdn/shop/articles/IMG_8596-Edit.jpg?v=1644329437&width=1100",
    postText: "Just hiked Angel's landing! 10/10 would recommend!",
    userId: 1,
    parkId: 61,
    activities: [18],
  },
  {
    postPic:
      "https://pbs.twimg.com/media/GI0ODf3awAAuM66?format=jpg&name=large",
    postText: "Scouts Lookout Trail\nCanyon Overlook Trail\nZion National Park",
    userId: 2,
    parkId: 61,
    activities: [25, 17],
  },
  {
    postPic:
      "https://pbs.twimg.com/media/GIxq5gBbAAAl5vC?format=jpg&name=medium",
    postText:
      "The Observation Point Trail is one of the best hikes in Zion National Park. How to reach this epic viewpoint? Read all about it in this article. https://opreismetco.nl/en/united-states/hiking-to-observation-point-zion-national-park-utah-usa/",
    userId: 3,
    parkId: 61,
    activities: [18, 40],
  },
  {
    postPic:
      "https://pbs.twimg.com/media/GJBIvEqXAAE1th9?format=jpg&name=large",
    postText: "Acadia National Park, Maine 🇺🇸",
    userId: 4,
    parkId: 1,
    activities: [18],
  },
  //First batch of 10 gpt posts
  {
    "postPic": "https://www.travelandleisure.com/thmb/ww-Zklc9HxVAs_yA8LuMDjFLMe8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/waterfall-HOTSPRINGS0117-26beda2a26f543f49fce2df482eb218c.jpg",
    "postText": "Took a scenic drive through Hot Springs National Park. The views were stunning!",
    "userId": 1,
    "parkId": 31,
    "activities": [2, 16]
  },
  {
    "postPic": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Aerial_view_of_dunefield%2C_White_Sands_National_Park%2C_New_Mexico%2C_United_States.png",
    "postText": "Explored the sand dunes of White Sands National Park. It felt like walking on another planet!",
    "userId": 2,
    "parkId": 56,
    "activities": [18, 40]
  },
  {
    "postPic": "https://images.squarespace-cdn.com/content/v1/646cd7c2d1d6cf6397922147/1685739516607-2I1LFS3T7705Q9V07K5N/image-asset.jpeg?format=1000w",
    "postText": "Hiked to the top of Angel's Landing in Zion National Park. The view from the summit was breathtaking!",
    "userId": 3,
    "parkId": 61,
    "activities": [18, 40]
  },
  {
    "postPic": "https://images.squarespace-cdn.com/content/v1/558c4442e4b00dc67b7f24a9/1495414254221-MZC3S194ZJRI6TG7A100/image-asset.jpeg",
    "secondPic": "https://images.squarespace-cdn.com/content/v1/558c4442e4b00dc67b7f24a9/1495678905816-1E61LLNF0I2SGKBUABMQ/image-asset.jpeg",
    "thirdPic": "https://images.squarespace-cdn.com/content/v1/558c4442e4b00dc67b7f24a9/1495678392437-BEGKC402OIYDBX857YHC/Northwestern+Fjords-38.jpg",
    "postText": "Went kayaking in Kenai Fjords National Park. Paddling among the glaciers was an unforgettable experience!",
    "userId": 4,
    "parkId": 36,
    "activities": [5, 25]
  },
  {
    "postPic": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Carlsbad_Interior_Formations.jpg",
    "secondPic": "https://upload.wikimedia.org/wikipedia/commons/4/46/Carlsbad-_Rock_of_Ages_in_the_Big_Room_Aaw27.jpg",
    "thirdPic": "https://whc.unesco.org/uploads/thumbs/site_0721_0008-750-750-20180810164115.jpg",
    "postText": "Explored the caves of Carlsbad Caverns National Park. The formations inside were awe-inspiring!",
    "userId": 5,
    "parkId": 10,
    "activities": [8, 16]
  },
  // Second batch of GPT posts
  {
    "postPic": "https://assets3.thrillist.com/v1/image/3159074/2880x1620/crop;webp=auto;jpeg_quality=60;progressive.jpg",
    "postText": "Took a scenic drive through Acadia National Park. The coastal views were absolutely breathtaking!",
    "userId": 1,
    "parkId": 1,
    "activities": [2, 16]
  },
  {
    "postPic": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Landscape_Arch_Utah.jpg/1024px-Landscape_Arch_Utah.jpg",
    "postText": "Went camping under the stars at Arches National Park. The rock formations were mesmerizing!",
    "userId": 2,
    "parkId": 2,
    "activities": [6, 16]
  },
  {
    "postPic": "https://www.blackhillsbadlands.com/sites/default/files/photos/blog/2017/04/FB_IMG_1490657199816.jpg",
    "postText": "Explored the beauty of Badlands National Park on horseback. The rugged landscapes were incredible!",
    "userId": 3,
    "parkId": 3,
    "activities": [19, 40]
  },
  {
    "postPic": "https://www.theflashlist.com/assets/venues/usa/tx-texas/southwest/big-bend/living/recreation/parks/big-bend-national-park/images/BigBend-RioGrande-Boat-1000.jpg",
    "postText": "Took a boat tour in Big Bend National Park. The views of the canyons from the river were stunning!",
    "userId": 4,
    "parkId": 4,
    "activities": [5, 16]
  },
  {
    "postPic": "https://npf-prod.imgix.net/uploads/FYP-shutterstock_221462002.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=872&q=80&w=1550",
    "postText": "Hiked among the giant sequoias in Biscayne National Park. It felt like stepping into a fairy tale!",
    "userId": 5,
    "parkId": 5,
    "activities": [18, 40]
  },
  {
    "postPic": "https://www.roadtripryan.com/go/resources/content/utah/san-rafael-swell/blackdragon/user-submitted/ryancornia-1558982673853.jpg",
    "postText": "Explored the caves of Black Canyon of the Gunnison National Park. The darkness added to the mystery!",
    "userId": 6,
    "parkId": 6,
    "activities": [8, 16]
  },
  {
    "postPic": "https://i0.wp.com/www.brycecanyoncountry.com/wp-content/uploads/bryce-canyon-national-park_thor_s-hammer-2-bryce-canyon-national-park-matt-morgan-scaled.webp?resize=683%2C1024&ssl=1",
    "postText": "Took a scenic drive through Bryce Canyon National Park. The hoodoos were a sight to behold!",
    "userId": 7,
    "parkId": 7,
    "activities": [2, 16]
  },
  {
    "postPic": "https://seasaltandfog.com/wp-content/uploads/2021/01/Canyonlands_11-MAIN-1024x683.jpg",
    "postText": "Enjoyed some stargazing in Canyonlands National Park. The night sky was incredibly clear!",
    "userId": 8,
    "parkId": 8,
    "activities": [2, 16]
  },
  {
    "postPic": "https://capitolreefcountry.com/wp-content/uploads/2023/02/Capitol-Reef-Couple-1200-x-800.jpg",
    "postText": "Took a boat tour in Capitol Reef National Park. The rock formations from the water were spectacular!",
    "userId": 9,
    "parkId": 9,
    "activities": [5, 16]
  },

  
];

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
