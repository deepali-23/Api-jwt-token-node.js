//Our user schema..basically structure of the document

const mongoose = require("mongoose");

const myschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//creating our collection//

const Myuser = mongoose.model("Myuser", myschema);
module.exports = Myuser;
