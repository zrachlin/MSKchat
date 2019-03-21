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

  const zr = await User.create({ username: 'zrachlin', password: 'zr' });
  users.push(zr);
  console.log(`Seeded ${users.length} users.`);

  const channels = await Promise.all([
    Channel.create({ name: 'general' }),
    Channel.create({ name: 'jobs' }),
    Channel.create({ name: 'random' }),
    Channel.create({ name: 'machine-learning' }),
    Channel.create({ name: 'questions' }),
  ]);
  console.log(`Seeded ${channels.length} channels.`);
  const general = await Channel.findOne({ where: { name: 'general' } });
  const jobs = await Channel.findOne({ where: { name: 'jobs' } });
  const questions = await Channel.findOne({ where: { name: 'questions' } });

  const messages = await Promise.all([
    Message.create({ userId: 1, content: 'Hi there', channelId: general.id }),
    Message.create({
      userId: 2,
      content: 'Good Morning!',
      channelId: general.id,
    }),
    Message.create({
      userId: zr.id,
      content: 'What brought you to MSK and this team specifically?',
      channelId: questions.id,
    }),
    Message.create({
      userId: zr.id,
      content: 'What are the biggest challenges your team is facing?',
      channelId: questions.id,
    }),
    Message.create({
      userId: zr.id,
      content: 'What are you primarily looking for in a new team member?',
      channelId: questions.id,
    }),
    Message.create({
      userId: zr.id,
      content:
        'How can I best get up to speed with the bioinformatics concepts and terminology? Best resources?',
      channelId: questions.id,
    }),
    Message.create({
      userId: zr.id,
      content:
        "What is your favorite part about working at MSK? What's the most frustrating/difficult part?",
      channelId: questions.id,
    }),
  ]);
  // order matters, so do these sequentially
  const m1 = await Message.create({
    userId: 3,
    content:
      'I need to hire someone to do full-stack software development ASAP',
    channelId: jobs.id,
  });
  messages.push(m1);
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
    await db.close();
    console.log('db connection closed');
  }
}
module.exports = runSeed;

if (module === require.main) {
  runSeed();
}
