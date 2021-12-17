const cors = require("cors");
const express = require("express");
const { success, error } = require("consola");
const { MongoClient } = require('mongodb');

// Bring in the app constants
const { PORT } = require("./config");

// Initialise the application
const app = express();

// Common middlewares
app.use(cors());
app.use(express.json());

// Connect with the Mongo database cluster and start the server
const { CLUSTER_URL, DB_USERNAME, DB_PASSWORD, DB_NAME } = require("./config");
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`; 
console.log(uri);            
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const startApp = async () => {
  try {
    await client.connect();

    success({ 
      message: `Successfully connected to database cluster \n${CLUSTER_URL}`,
      badge: true
    });

    app.listen(PORT, () =>
      success({ message: `Server started on Port: ${PORT}`, badge: true })
    );

  }

  catch (err) {
    error({
      message: `Unable to connect with database cluster\n${err}`,
      badge: true
    });
    startApp();
  }
};

startApp();