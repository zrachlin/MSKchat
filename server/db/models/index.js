const Message = require('./message');
const Channel = require('./channel');
const User = require('./user');
const LastVisit = require('./lastVisit');

// Define model relationships
Channel.hasMany(Message, {
  onDelete: 'cascade', // delete all the messages if a channel gets deleted
  hooks: true,
});
// Gives each message a channelId
Message.belongsTo(Channel);

User.hasMany(Message);
// Gives each message a userId
Message.belongsTo(User);

// Users' last visits to channel through-table
Channel.belongsToMany(User, { through: LastVisit });
User.belongsToMany(Channel, { through: LastVisit });

module.exports = {
  Channel,
  Message,
  User,
  LastVisit,
};
