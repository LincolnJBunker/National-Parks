import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

export const db = await connectToDB('postgresql:///national-parks');



// Model Names
// Park
// User
// Post
// Comment
// Activity
// Message
// Follower
// 







// export class User extends Model {
//   [util.inspect.custom]() {
//     return this.toJSON();
//   }
// } 
// User.init(
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     uuid: {
//         type: DataTypes.UUID,
//         defaultValue: () => uuidv4(),
//         uniqe: true,
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//     },
//     whiteColor: {
//         type: DataTypes.STRING,
//         defaultValue: '#EAC796',
//     },
//     blackColor: {
//         type: DataTypes.STRING,
//         defaultValue: '#583927',
//     },
//     pieceStyle: {
//       type: DataTypes.ENUM('old', 'new'),
//       defaultValue: 'new'
//     },
//     playSound: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//     },
//     onBottom: {
//         type: DataTypes.ENUM('regular', 'flipped'),
//         defaultValue: 'regular',
//     },
//     showMoves: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
//     bio: {
//         type: DataTypes.TEXT,
//         defaultValue: 'Your computerbox needs words!'
//     },
//     photoURL: {
//         type: DataTypes.STRING,
//         defaultValue: 'https://video-images.vice.com/articles/57c66daba81c526c72f78570/lede/homestar.gif'
//     },
//     country: {
//         type: DataTypes.STRING,
//         defaultValue: 'Free Country USA'
//     },
//     birthYear: {
//         type: DataTypes.INTEGER,
//     },
//     publicRating: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1200,
//     },
//     privateRating: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1200,
//     }
//   },
//   {
//     modelName: 'user',
//     sequelize: db,
//   }
// );