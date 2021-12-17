const cors = require("cors");
const exp = require("express");
const { connect } = require("mongoose");
const { success, error } = require("consola");

// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialise the application
const app = exp();

app.listen(PORT, () => 
  success({ message: `Server started on Port: ${PORT}`, badge: true })
);
