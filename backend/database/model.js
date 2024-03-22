import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

export const db = await connectToDB("postgresql:///national-parks");

// Model Names
// Park
// User
// Post
// Comment
// Activity
// Message
// Follow

export class Park extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Park.init(
  {
    parkId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    states: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "park",
    sequelize: db,
  }
);

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      // Just a time stamp for when the account was created
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: "Update your bio",
    },
    userPic: {
      // could
      type: DataTypes.STRING,
      defaultValue:
        "https://icons.veryicon.com/png/o/application/designe-editing/add-image-1.png",
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

export class Post extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Post.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postText: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    postPic: {
      type: DataTypes.STRING,
      defaultValue:
        "https://icons.veryicon.com/png/o/application/designe-editing/add-image-1.png",
    },
  },
  {
    modelName: "post",
    sequelize: db,
  }
);

export class Comment extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Comment.init(
  {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    commentText: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "comment",
    sequelize: db,
  }
);

export class Activity extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Activity.init(
  {
    activityId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    photoURL: {
      type: DataTypes.STRING,
      defaultValue:
        "https://icons.veryicon.com/png/o/application/designe-editing/add-image-1.png",
    },
  },
  {
    modelName: "activity",
    sequelize: db,
  }
);

export class Message extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "message",
    sequelize: db,
  }
);

export class Follow extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Follow.init(
  {
    followId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    followerId: {
      // userId of the person who's following
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followedId: {
      // userId of the person who is being followed
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "follow",
    sequelize: db,
  }
);

Park.belongsToMany(Activity, { through: "ParkActivity" });
Activity.belongsToMany(Park, { through: "ParkActivity" });


User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User, {foreignKey: 'userId'});
Comment.belongsTo(Post, {foreignKey: 'postId'});
Post.hasMany(Comment, {foreignKey: 'postId'});


User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User, {foreignKey: 'userId'});
Post.belongsTo(Park, {foreignKey: 'parkId'});
Park.hasMany(Post, {foreignKey: 'parkId'});

Post.belongsToMany(Activity, {through: "PostActivity"})
Activity.belongsToMany(Post, {through: "PostActivity"})

