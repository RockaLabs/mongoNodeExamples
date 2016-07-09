var faker = require('faker');

Object.assign = require('object-assign')

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/chat';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');

    // Create users
    var list = [];
    for (var i = 0; i < 100000; i++) {
      var user = {
        index: faker.random.number(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        name: faker.name.firstName() + faker.name.lastName(),
        domain: faker.internet.domainName(),
        emails: [faker.internet.email()],
        roles: ['admin', 'moderator', 'user'],
        createdAt: new Date()
      };

      list.push(user);

      if (i % 300 === 299) {
        // Insert many users
        collection.insertMany(list, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "users" collection.', result.result.n);
            }
        });

        list = [];
      }
    }

    console.log('Users inserted!!! :D');

    // db.close();
  }
});