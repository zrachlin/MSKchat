const db = require('../server/db');
const runSeed = require('../seed');
before(() => db.sync({ force: true }));
afterEach(() => db.sync({ force: true }));
after(() => {
  console.log('Re-seeding database post-testing');
  runSeed();
});
