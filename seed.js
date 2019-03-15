const db = require('./server/db');
const { User, Channel, Message } = require('./server/db/models');

const seed = async () => {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ username: 'user1', password: '123' }),
    User.create({ username: 'user2', password: '234' }),
    User.create({ username: 'user3', password: '345' }),
  ]);
  console.log(`Seeded ${users.length} users.`);

  const channels = await Promise.all([
    Channel.create({ name: 'general' }),
    Channel.create({ name: 'jobs' }),
  ]);
  console.log(`Seeded ${channels.length} channels.`);

  const general = await Channel.findOne({ where: { name: 'general' } });
  const jobs = await Channel.findOne({ where: { name: 'jobs' } });

  // setTimeout(async () => {
  //   general.updatedAt = new Date()
  //   await general.save()
  // }, 10000);

  const messages = await Promise.all([
    Message.create({ userId: 1, content: 'Hi there', channelId: general.id }),
    Message.create({
      userId: 2,
      content: 'Good Morning!',
      channelId: general.id,
    }),
    Message.create({
      userId: 3,
      content: 'I need to hire someone to do full-stack engineering',
      channelId: jobs.id,
    }),
    Message.create({
      userId: 1,
      content: 'You should hire Zach Rachlin',
      channelId: jobs.id,
    }),
  ]);
  console.log(`Seeded ${messages.length} messages.`);
};

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    // setTimeout(async () => {
    //   await db.close();
    //   console.log('db connection closed');
    // }, 20000);
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}
