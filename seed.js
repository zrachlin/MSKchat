const db = require('./server/db');
const { User, Channel, Message } = require('./server/db/models');

const usersSeed = [];
const channelsSeed = [];
const messagesSeed = [];

const seed = async () => {
  const users = await Promise.all(
    usersSeed.map(user => {
      User.create(user);
    })
  );
  console.log(`Seeded ${users.length} users.`);

  const channels = await Promise.all(
    channelsSeed.map(channel => {
      Channel.create(channel);
    })
  );
  console.log(`Seeded ${channels.length} channels.`);

  const messages = Promise.all(
    messagesSeed.map(message => {
      Message.create(message);
    })
  );
  console.log(`Seeded ${messages.length} messages.`);
};

async function runSeed() {
  console.log('Seeding db...');
  try {
    await seed();
  } catch (err) {
    console.log('Error while seeding...');
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('Closing db connection...');
    await db.close();
    console.log('Closed connection to db.');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
