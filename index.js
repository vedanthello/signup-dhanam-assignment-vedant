const cors = require("cors");
const express = require("express");
const { success, error } = require("consola");
const { connect } = require("mongoose");

// Bring in the app constants
const { PORT } = require("./config");

// Initialise the application
const app = express();

// Common middlewares
app.use(cors());
app.use(express.json());

// User Router middleware
app.use("/users", require("./routes/users.js"));

// Connect with the Mongo database cluster and start the server
const { CLUSTER_URL, DB_USERNAME, DB_PASSWORD, DB_NAME } = require("./config");
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`; 

const startApp = async () => {

  try {

    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

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