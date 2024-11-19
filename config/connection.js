const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(res => {
    console.log("Database Connected Successfully with the Server");
}).catch(err => {
    console.log("Database Connection Failed");
    console.log(err);
})