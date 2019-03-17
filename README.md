# Welcome to MSK Chat!

## Instructions for running

Assuming you already have `git` and `npm` installed, run the following in a terminal:

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

To seed the database (make sure you're still in the root level of the project directory):

```
npm run seed
```

To start the server on Port 8080 and create the `bundle.js` file:

```
npm run start
```

In your browser, navigate to `localhost:8080`.

You should be all set and ready to chat!

## Testing

In another terminal, run the following:

```
npm test
```
