# Welcome to MSK Chat!

## Instructions for Running

### Prerequisites:

- `node & npm` -> https://nodejs.org/en/download/
- `PostgreSQL` -> https://www.postgresql.org/download/
- `git` -> https://git-scm.com/

Assuming you have the prerequisites installed, run the following in a terminal:

```
git clone https://github.com/zrachlin/MSKchat
cd MSKchat
npm install
```

This project uses a `PostgreSQL` database for persistence. If you have the `createdb` command, run the following:

```
createdb mskchat
```

Otherwise, create a database named `mskchat` however you normally do.

**Important:** Go to `/server/db/db.js` and change the `connectionString` on line 6 to include your postgres credentials (replace `'your-username'` and `'your-password'` in the string). If you don't have credentials set up, the following should work instead: `'postgres://localhost:5432/mskchat'`

To run the application your first time, execute the following:

```
npm run seed-and-start
```

This will seed the database and then start the server on Port 8080 and create the `bundle.js` file.

In your browser, navigate to `localhost:8080`.

You should be all set and ready to chat!

Feel free to create your own account by clicking on the "Sign Up" tab on the top. Alternatively, you can log in as any of the following sample users:

- username: 'user1', password: '123'
- username: 'user2', password: '234'
- username: 'user3', password: '345'

On all subsequent starts, you can just use the following command:

```
npm start
```

If you would like to re-seed the database at any point:

```
npm run seed
```

## Testing

In a terminal, run the following:

```
npm test
```

The database will temporarily be cleared for testing purposes, but it should automatically re-seed after the testing has completed.

## Key Features

- Socket.io is used for live-updates of chatrooms for all users. To test this, open an incognito browser, navigate to localhost:8080, and log in as a different user than in your other browser.
- Channel creation - all users can create and name a channel, which sets up a new chatroom. Click on any channel in the sidebar to go to that chatroom
- Unread message counts - all channels will display an unread message count if new messages have appeared in that channel since the last time the user visited it. This is based on the persisted data in postgres, so it should be accurate when a user logs out and then in at a later time (it has nothing to do with the session).
- API routes for user data are only exposed for the current user (because they are located at /api/users/me rather than :userId)

## Desired Features

- Display the channel creator
- Private channels and/or the ability to create a channel and invite other users
- Notifications
- Delete channels and messages (if you are a member and the messages are your own)
- Admin capability
- Emoji support :disappointed: -> :smiley:
- File/image upload support

## Screenshots

![Login-Screen](/public/login-screen.png)
![Chatroom-Screen](/public/chatroom-screen.png)
