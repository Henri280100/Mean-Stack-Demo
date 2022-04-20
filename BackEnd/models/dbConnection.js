const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, (err) => {
    if (!err) {
        console.log("Connect to MongoDB Succeeded");
    } else {
        console.log('Connect to MongoDB Failure: ' + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model')