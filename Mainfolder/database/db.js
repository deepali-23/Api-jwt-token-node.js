const mongoose = require("mongoose");

///settig up our database connection

mongoose
  .connect(
    "mongodb+srv://deepali:deepali@cluster0.wyqhk.mongodb.net/myuser?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )

  .then(() => console.log("connection successful "))
  .catch((err) => console.log(err));
