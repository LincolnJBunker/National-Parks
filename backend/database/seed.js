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
    "postText": "Explored the stunning rock formations of Capitol Reef National Park. The scenic drive was unforgettable!!",
    "userId": 9,
    "parkId": 9,
    "activities": [2, 16]
  },
  // Third batch of gpt posts
  {
    "postPic": "https://d2dzi65yjecjnt.cloudfront.net/813380-4.jpg",
    "secondPic": "https://www.hotsprings.org/site/assets/files/5693/hot_springs_national_park_thermal_pool_arlington_park2.533x0-is.jpg",
    "postText": "Just finished a relaxing day at Hot Springs National Park. The thermal waters were incredibly soothing!",
    "userId": 10,
    "parkId": 31,
    "activities": [14, 36]
  },
  {
    "postPic": "https://media.cntraveler.com/photos/5c6c25735ac5fd121f4375a1/16:9/w_1600,c_limit/Indiana-Dunes-Nat'l-Park_A7DC44.jpg",
    "secondPic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSShBvgyL_R9aRToj4JPbDr1TnaeOR88d_G2A&usqp=CAU",
    "postText": "Spent the day exploring the beautiful sand dunes at Indiana Dunes National Park. The views of Lake Michigan were breathtaking!",
    "userId": 11,
    "parkId": 32,
    "activities": [4, 6]
  },
  {
    "postPic": "https://www.rei.com/assets/adventures/images/trip/gallery/northamerica/irk_08/live.jpg",
    "secondPic": "https://adventurehacks.com/wp-content/uploads/2020/12/isle.jpg",
    "thirdPic": "https://www.michigan.org/sites/default/files/styles/listing_slideshow/public/listing_images/profile/7504/4915a262d983ef81457109057e934b38_dmss18_isleroyalenationalpark_hiking08_drewmason.jpg?itok=XR_dC5_Q",
    "postText": "Isle Royale National Park is a hidden gem! The remote wilderness and pristine lakes make it a perfect escape from the city.",
    "userId": 12,
    "parkId": 33,
    "activities": [18, 20]
  },
  {
    "postPic": "https://cdn.outsideonline.com/wp-content/uploads/2019/10/15/joshua-tree-sunset_h.jpg?crop=16:9&width=1600&enable=upscale&quality=100",
    "secondPic": "https://as1.ftcdn.net/v2/jpg/03/53/12/42/1000_F_353124252_ZpoXAHg0bIHN8TNgoluEuDU5fJXVMG9l.jpg",
    "thirdPic": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/gorgeous-sunset-at-joshua-tree-national-park-melanie-viola.jpg",
    "postText": "Just watched the sunset amidst the iconic Joshua Trees in Joshua Tree National Park. Nature's beauty at its finest!",
    "userId": 1,
    "parkId": 34,
    "activities": [18, 32]
  },
  {
    "postPic": "https://i.abcnewsfe.com/a/82da8627-4e5d-4e34-964f-2bfa614fded3/katmai-national-park-alaska-gty-moe-025-231001_1696179697977_hpMain_16x9.jpg?w=992",
    "secondPic": "https://www.travelalaska.com/sites/default/files/2021-12/Destinations_ParksPublicLands_Katmai%20National%20Park_Hero_1.jpg",
    "thirdPic": "https://kuliklodge.com/wp-content/uploads/2019/03/Kulik-Lodge-Katmai-National-Park.jpg",
    "postText": "Got to witness grizzly bears fishing for salmon in Katmai National Park & Preserve. Such a raw and untouched wilderness!",
    "userId": 2,
    "parkId": 35,
    "activities": [12, 40]
  },
  {
    "postPic": "https://www.worldtribune.org/wp-content/uploads/sites/2/2021/11/Kenai-Fjords-National-Park_GettyImages-523835516-copy-scaled.jpg",
    "secondPic": "https://www.tripsavvy.com/thmb/g4NsRgMhfftZZQOerhIiEHoULeA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-523837768-d8db3dd9768549fc9a3716c7f6edfecc.jpg",
    "thirdPic": "https://i.natgeofe.com/n/d742d396-567e-4813-a33b-9fa263fb1f15/2123_2x3.jpg",
    "postText": "Today, I cruised through the icy waters and towering fjords of Kenai Fjords National Park. What a surreal experience!",
    "userId": 3,
    "parkId": 36,
    "activities": [5, 16]
  },
  {
    "postPic": "https://quirkytravelguy.com/wp-content/uploads/2023/08/tent-kobuk-valley.jpg",
    "secondPic": "https://www.nps.gov/kova/planyourvisit/images/Dunes_Niaktovik-Creek_stopping-for-a-rest.jpg?maxwidth=1300&autorotate=false",
    "thirdPic": "https://upgradedpoints.com/wp-content/uploads/2023/07/Caribou-Kobuk-River.jpg?auto=webp&disable=upscale&width=1200",
    "postText": "Ventured into the vast wilderness of Kobuk Valley National Park. The sand dunes and caribou herds were truly mesmerizing!",
    "userId": 4,
    "parkId": 37,
    "activities": [6, 40]
  },
  {
    "postPic": "https://www.nps.gov/articles/000/images/LACL_2006_BullMooseTelaquana_JMills_1.jpg",
    "secondPic": "https://uploads.alaska.org/general/_1200x630_crop_center-center_82_none/Lake-Clark-National-Park2.jpg?mtime=1592022554",
    "thirdPic": "",
    "postText": "Lake Clark National Park & Preserve is a paradise for outdoor enthusiasts like me. Hiked along the pristine lakeshores and spotted some majestic wildlife!",
    "userId": 5,
    "parkId": 38,
    "activities": [18, 40]
  },
  {
    "postPic": "https://www.americansouthwest.net/california/photographs700/white-mud-pot.jpg",
    "secondPic": "https://media-cdn.tripadvisor.com/media/photo-s/0c/b6/1a/fe/bumpass-hell-mud-pots.jpg",
    "thirdPic": "https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/vc_ca101_nationalparks_lassenvolcanic_manzanitalake_rf_628846294_1280x640.jpg",
    "postText": "Witnessed bubbling mud pots and steaming fumaroles at Lassen Volcanic National Park. Nature's geothermal wonders never cease to amaze me!",
    "userId": 6,
    "parkId": 39,
    "activities": [2, 6]
  },
  {
    "postPic": "https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/2016-10/Mammoth%20Cave.jpg?h=0f4230fa&itok=nd7doyUh",
    "secondPic": "https://baldthoughts.boardingarea.com/wp-content/uploads/2021/01/Mammoth-Cave-National-Park-entrance-sign-Timothy-and-Scarlett.jpg",
    "thirdPic": "https://i.natgeofe.com/n/3f37cb9b-10ff-4c6a-8c9d-a89b89f24ba5/NationalGeographic_2306935.JPG",
    "postText": "Explored the eerie underground world of Mammoth Cave National Park. The stalactites and stalagmites were like something out of a fantasy!",
    "userId": 7,
    "parkId": 40,
    "activities": [8, 24]
  },
  // Fourth batch of GPT posts
  // {
  //   postPic: "https://www.nps.gov/common/uploads/grid_builder/pinn/crop16_9/F1FA95BE-CB3E-1B90-73096E29BBA7A5CF.jpg?width=640&quality=90&mode=crop",
  //   secondPic: "https://www.nps.gov/pinn/learn/nature/images/IMG_2194_1.jpg",
  //   thirdPic: "https://www.utahsadventurefamily.com/wp-content/uploads/2022/07/Pinnacles-National-Park-2.jpeg",
  //   postText: "Took a scenic hike at Pinnacles National Park. The rock formations are stunning!",
  //   userId: 1,
  //   parkId: 41,
  //   activities: [18] // Hiking
  // },
  // {
  //   postPic: "https://www.conservancyforcvnp.org/wp-content/uploads/2023/12/Mikyway-MSR-tent-copy-1024x678.png",
  //   secondPic: "https://thenationsvacation.com/wp-content/uploads/2020/07/Header-Stargazing.jpg",
  //   thirdPic: "https://npca.s3.amazonaws.com/images/8784/7b1be657-31f5-4b7e-a28d-a0c58adc7631-banner.jpg?1445970620",
  //   postText: "Camped under the stars at Cuyahoga Valley National Park. What a peaceful night!",
  //   userId: 2,
  //   parkId: 42,
  //   activities: [6] // Camping
  // },

  // Fourth batch of GPT posts

  {
    postPic: "https://www.nps.gov/common/uploads/grid_builder/meve/crop16_9/FC9A8477-D9C0-68BE-9270F91A24CB4B88.jpg?width=1300&quality=90&mode=crop",
    secondPic: "https://images.squarespace-cdn.com/content/v1/564d14dfe4b0290681184a82/1491524148199-271WCHY0MTDWEQMHFECN/Mesa+Verde+National+Park+-+005.jpg",
    thirdPic: "https://images.squarespace-cdn.com/content/v1/57a626bc893fc0f0fd89ab8c/df820bcd-1486-405d-a66f-e80dadcda956/KVD_5988.jpg",
    postText: "Drove through the winding roads of Mesa Verde National Park, marveling at the ancient cliff dwellings. History whispers in every stone!",
    userId: 1,
    parkId: 41,
    activities: [2, 6, 10] // Astronomy, Camping, Guided Tours
  },
  {
    postPic: "https://images.seattletimes.com/wp-content/uploads/2022/12/12052022_3_153635.jpg",
    secondPic: "https://www.nps.gov/mora/planyourvisit/images/2014-1-14_Paradise_KLoving_web.jpeg",
    thirdPic: "https://static.wixstatic.com/media/2ef742_0f0d97fd7c6d4be486b34ff463c18bed~mv2.png/v1/fill/w_1000,h_563,al_c,q_90,usm_0.66_1.00_0.01/2ef742_0f0d97fd7c6d4be486b34ff463c18bed~mv2.png",
    postText: "Conquered the snowy trails of Mount Rainier National Park on my trusty mountain bike. The adrenaline rush was worth the climb!",
    userId: 9,
    parkId: 42,
    activities: [4, 18] // Biking, Hiking
  },
  {
    postPic: "https://www.nps.gov/common/uploads/grid_builder/neri/crop16_9/7C7B0247-1DD8-B71B-0B21F09BD8D7BB80.jpg?width=640&quality=90&mode=crop",
    secondPic: "https://photos.thedyrt.com/photo/129427/media/west-virginia-stone-cliff-beach_5f28f663b0c947b1f27c4ce95d77f424.jpeg",
    thirdPic: "https://pbs.twimg.com/media/Fu03wk2WIAsCRNV?format=jpg&name=4096x4096",
    postText: "Set up camp by the rushing waters of New River Gorge National Park & Preserve. Falling asleep to the sound of nature's lullaby is pure bliss!",
    userId: 3,
    parkId: 43,
    activities: [6, 17] // Camping, Hands-On
  },
  {
    postPic: "https://live.staticflickr.com/3827/9505345293_16bd0b927e_h.jpg",
    secondPic: "https://www.usatoday.com/gcdn/-mm-/e6c17e797b5584fba45ce76a17ac39049b00308b/c=0-0-1498-846/local/-/media/2018/10/09/USATODAY/USATODAY/636746887858298738-NorthCascadesNPMichaelRickardSTESmall.jpg?width=1498&height=846&fit=crop&format=pjpg&auto=webp",
    thirdPic: "https://cache.desktopnexus.com/thumbseg/1764/1764468-bigthumbnail.jpg",
    postText: "Witnessed the breathtaking beauty of the North Cascades National Park as the golden sun dipped behind the towering peaks. Nature's masterpiece!",
    userId: 4,
    parkId: 44,
    activities: [2, 35] // Astronomy, Surfing (Surfing metaphorically in the beauty of nature!)
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Immersed myself in the lush rainforests of Olympic National Park, where every step feels like a journey into a fairytale world!",
    userId: 5,
    parkId: 45,
    activities: [18, 24] // Hiking, Museum Exhibits
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Strolled through the otherworldly landscape of Petrified Forest National Park, feeling like a time traveler amidst ancient giants turned to stone!",
    userId: 6,
    parkId: 46,
    activities: [18, 40] // Hiking, Wildlife Watching
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Explored the rugged terrain of Pinnacles National Park, where every crag and crevice holds the promise of adventure!",
    userId: 7,
    parkId: 47,
    activities: [18, 29] // Hiking, Shopping (Shopping for thrills in nature!)
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Marveled at the towering giants of Redwood National and State Parks, where the trees seem to touch the sky. Nature's skyscrapers!",
    userId: 8,
    parkId: 48,
    activities: [18, 24] // Hiking, Museum Exhibits
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Took a scenic drive through the breathtaking landscapes of Rocky Mountain National Park, where every turn reveals a new vista of awe-inspiring beauty!",
    userId: 9,
    parkId: 49,
    activities: [2, 5] // Scenic Driving, Boating (Metaphorical boating in the sea of mountains!)
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Stood in awe beneath the majestic saguaros of Saguaro National Park, feeling like a tiny speck in the vastness of the desert landscape!",
    userId: 10,
    parkId: 50,
    activities: [18, 40] // Hiking, Wildlife Watching
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Ventured into the heart of the giant sequoias at Sequoia & Kings Canyon National Parks. Nature's skyscrapers make you feel small in the best way possible!",
    userId: 1,
    parkId: 51,
    activities: [18, 40] // Hiking, Wildlife Watching
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Embraced the scenic beauty of Shenandoah National Park, where each vista is a masterpiece painted by nature's brush!",
    userId: 2,
    parkId: 52,
    activities: [2, 18, 40] // Astronomy, Hiking, Wildlife Watching
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Immersed myself in the rugged landscapes of Theodore Roosevelt National Park, where the wild spirit of the west still roams free!",
    userId: 3,
    parkId: 53,
    activities: [18, 40] // Hiking, Wildlife Watching
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Explored the vibrant underwater world of Virgin Islands National Park, where colorful coral reefs teem with life beneath the azure waves!",
    userId: 4,
    parkId: 54,
    activities: [5, 28] // Boating, SCUBA Diving (Metaphorically diving into nature's aquarium!)
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Embarked on a thrilling boat tour through the maze of islands at Voyageurs National Park, where every twist and turn reveals a new adventure!",
    userId: 5,
    parkId: 55,
    activities: [5, 16] // Boating, Guided Tours
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Sank my toes into the soft sands of White Sands National Park, where the dunes stretch as far as the eye can see. Nature's sandbox!",
    userId: 6,
    parkId: 56,
    activities: [18, 20] // Hiking, Hunting and Gathering (Hunting for the perfect dune view!)
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Explored the mysterious depths of Wind Cave National Park, where underground wonders await at every twist and turn!",
    userId: 7,
    parkId: 57,
    activities: [8, 18] // Caving, Hiking
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Embarked on an epic adventure through the vast wilderness of Wrangell - St Elias National Park & Preserve. Nature's playground knows no bounds!",
    userId: 8,
    parkId: 58,
    activities: [18, 40] // Hiking, Wildlife Watching
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Witnessed the raw power of nature at Yellowstone National Park, where geysers erupt and wildlife roams free. A true natural wonder!",
    userId: 9,
    parkId: 59,
    activities: [2, 18, 40] // Astronomy, Hiking, Wildlife Watching
  },
  {
    postPic: "",
    secondPic: "",
    thirdPic: "",
    postText: "Gazed in awe at the towering granite cliffs of Yosemite National Park, where every vista is a masterpiece crafted by Mother Nature herself!",
    userId: 10,
    parkId: 60,
    activities: [18, 40] // Hiking, Wildlife Watching
  }
  

  
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
