'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

// Models
const { Channel, Message, User } = require('../server/db/models');

// Express Routes
const app = require('../server');
const agent = require('supertest')(app);

describe('Channel Model', () => {
  // defined in ../server/models/channel.js
  describe('Channel model', () => {
    describe('Validations', () => {
      it('requires `name`', async () => {
        const channel = Channel.build();

        try {
          await channel.validate();
          throw Error(
            'validation was successful but should have failed without `name`'
          );
        } catch (err) {
          expect(err.message).to.contain('name cannot be null');
        }
      });
    });
  });

  // defined in ../server/api/channels.js
  describe('Channel routes', () => {
    let storedChannels;

    const channelData = [
      {
        name: 'Test Channel 1',
      },
      {
        name: 'Test Channel 2',
      },
    ];

    beforeEach(async () => {
      const createdChannels = await Channel.bulkCreate(channelData);
      storedChannels = createdChannels.map(channel => channel.dataValues);
    });

    // Route for fetching all channels
    describe('GET `/api/channels`', () => {
      it('serves up all Channels', async () => {
        const response = await agent.get('/api/channels').expect(200);
        expect(response.body).to.have.length(2);
        expect(response.body[0].name).to.equal(storedChannels[0].name);
      });
    });

    // Route for fetching a single channel
    describe('GET `/api/channels/:id`', () => {
      it('serves up a single Channel by its `id`', async () => {
        const response = await agent.get('/api/channels/2').expect(200);
        expect(response.body.name).to.equal('Test Channel 2');
      });
    });
  });
  // defined in ../server/api/message.js
  describe('Message routes', () => {
    let storedMessages;
    let storedUsers;

    const userData = [
      {
        username: 'User 1',
      },
      { username: 'User2' },
    ];
    const messageData = [
      {
        content: 'Hi, this message is from User 1',
        userId: 1,
      },
      {
        content: 'Hi, this message is from User 2',
        userId: 2,
      },
    ];

    beforeEach(async () => {
      const createdUsers = await User.bulkCreate(userData);
      const createdMessages = await Message.bulkCreate(messageData);
      storedUsers = createdUsers.map(user => user.dataValues);
      storedMessages = createdMessages.map(message => message.dataValues);
    });

    // Route for fetching all channels
    describe('GET `/api/messages`', () => {
      it('serves up all Messages', async () => {
        const response = await agent.get('/api/messages').expect(200);
        expect(response.body).to.have.length(2);
        expect(response.body[0].content).to.equal(storedMessages[0].content);
        expect(response.body[1].user.username).to.equal(
          storedUsers[1].username
        );
      });
    });
  });
});
