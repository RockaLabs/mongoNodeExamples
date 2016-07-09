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

    //Create some users
    var user1 = { index: 1, username: 'lauraguirre', name: 'Laura Aguirre',  twitter: 'https://twitter.com/lauraguirre011', emails: ['laura@rockalabs.com'], roles: ['admin', 'moderator', 'user'], createdAt: new Date()  };
    var user2 = { index: 2, username: 'felipesalazar', name: 'Felipe Salazar',  twitter: 'https://twitter.com/elpipesalazar', emails: ['felipe@rockalabs.com'], roles: ['moderator'], createdAt: new Date()};
    var user3 = { index: 3, username: 'jdmorales', name: 'John Morales',  twitter: '', emails: ['john@rockalabs.com'], roles: ['moderator', 'user'], createdAt: new Date()};
    var user4 = { index: 4, username: 'juankzuluaga', name: 'Juan Zuluaga',  twitter: 'https://twitter.com/Juankzu', emails: ['juan@rockalabs.com'], roles: ['user'], createdAt: new Date()};
    var user5 = { index: 5, username: 'xergioalex', name: 'Sergio Alexander', twitter: 'https://twitter.com/xergioalex', emails: ['xergioalex@gmail.com', 'xergioalex@rockalabs.com'], roles: ['admin', 'moderator', 'user'], createdAt: new Date()};


    // Insert some users
    collection.insert([user1, user2, user3, user4, user5], function (err, result) {
        if (err) {
            console.log(err);

            // Close connection
            db.close();
        } else {
            console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.result.n, result);

            // Close connection
            db.close();
        }
    });
  }
});